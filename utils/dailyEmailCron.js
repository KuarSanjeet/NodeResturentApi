const cron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './.env' }); // Load environment variables

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREAL_USER_NAME, // Access environment variable
        pass: process.env.ETHEREAL_PASSWORD // Access environment variable
    }
});

// Function to send email every minute
const sendEmailEveryMinute = () => {
    const mailOptions = {
        from: 'kuarsanjeet37@gmail.com',
        to: 'kuarsanjeet327@gmail.com',
        subject: 'Cron Notification',
        text: 'Hi Good Morning! \n Start your day with NodeApi.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Schedule the cron job to send email 
cron.schedule('0 9 * * *', sendEmailEveryMinute);
