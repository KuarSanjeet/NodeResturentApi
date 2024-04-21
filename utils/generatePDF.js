const PDFDocument = require('pdfkit');
const fs = require('fs');

function generatePDF(userData) {
    // Create a new PDF document
    const doc = new PDFDocument({
        layout: 'portrait',
        margin: 50
    });

    // Gradient background
    const gradient = doc.linearGradient(0, 0, 0, 400);
    gradient.stop(0, '#e6e6e6').stop(1, '#ffffff');
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(gradient);

    // Welcome message
    doc.font('Helvetica-Bold').fontSize(24).fillColor('#333333').text(`Welcome to ${userData.restaurantName}!`, {
        align: 'center',
        lineGap: 20
    });

    // User greeting
    doc.font('Helvetica').fontSize(18).fillColor('#666666').text(`Hello ${userData.userName},`, {
        align: 'center',
        lineGap: 15
    });

    // Introduction and message
    doc.fontSize(14).fillColor('#333333').text('We are thrilled to have you join our culinary community.', {
        align: 'center',
        lineGap: 10
    });
    doc.text('Explore a world of flavors and enjoy a delightful dining experience with us.', {
        align: 'center',
        lineGap: 10
    });

    // Thank you message and user email
    doc.font('Helvetica-Oblique').fontSize(14).fillColor('#666666').text(`Thank you for choosing ${userData.restaurantName}!`, {
        align: 'center',
        lineGap: 10
    });
    doc.font('Helvetica').fontSize(14).fillColor('#333333').text(`Your email: ${userData.email}`, {
        align: 'center',
        lineGap: 10
    });

    // Call to action and social media
    doc.font('Helvetica-Bold').fontSize(16).fillColor('#333333').text('Stay Connected', {
        align: 'center',
        lineGap: 15
    });
    doc.font('Helvetica').fontSize(14).fillColor('#666666').text(`Follow us on ${userData.socialMedia} to stay updated with our latest promotions and special offers.`, {
        align: 'center',
        lineGap: 10
    });

    // Save the PDF file
    const pdfPath = `welcome_email_${userData.email}.pdf`;
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.end();

    return pdfPath; 
}

module.exports = { generatePDF };
