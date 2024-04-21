const nodemailer = require('nodemailer');
const fs = require('fs');

async function sendEmailWithPDF(userData, pdfFilePath = "") {
    try {
        // Create a Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'ethereal',
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: process.env.ETHEREAL_USER_NAME,
                pass: process.env.ETHEREAL_PASSWORD
            }
        });

        // Email content
        let emailContent = `
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                <img src="cid:logo" alt="NodeApi Cafe Logo" style="max-width: 150px;">
                <h1 style="color: #d9534f;">Welcome to NodeApi Cafe!</h1>
                <p style="font-size: 18px; color: #333333;">Hello ${userData.userName},</p>
                <p style="font-size: 16px; color: #555555;">We are thrilled to have you join our culinary community.</p>
                <p style="font-size: 16px; color: #555555;">Explore a world of flavors and enjoy a delightful dining experience with us.</p>
                <p style="font-size: 14px; color: #777777;">Thank you for choosing NodeApi Cafe!</p>
                <p style="font-size: 14px; color: #555555;">Your email: ${userData.email}</p>
                <h2 style="color: #007bff;">Stay Connected</h2>
                <p style="font-size: 14px; color: #555555;">Follow us on social media to stay updated with our latest promotions and special offers.</p>
                <img src="cid:footer" alt="NodeApi Cafe Footer" style="max-width: 300px;">
                <p style="font-size: 18px; color: #28a745;">Experience the Taste of Excellence!</p>
            </div>
        `;

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'kuarsanjeet37@gmail.com',
            to: userData.email,
            subject: 'Welcome to Our NodeApi Cafe!',
            html: emailContent,
            attachments: [
                {
                    filename: 'welcome.pdf',
                    path: pdfFilePath,
                    cid: 'logo'  // Content ID for the logo image
                }
            ]
        });

        // Delete the PDF file after sending email
        fs.unlink(pdfFilePath, (err) => {
            if (err) {
                console.error('Error deleting PDF file:', err);
            } else {
                console.log('PDF file deleted successfully.');
            }
        });

        console.log('Email sent: ', info.messageId);
        console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(`Error in sending email ${error}`);
    }
}

module.exports = { sendEmailWithPDF };
