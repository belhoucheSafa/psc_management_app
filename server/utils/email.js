const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Email templates
const emailTemplates = {
  teamCreation: (teamData) => ({
    subject: 'PSC - Votre équipe a été créée avec succès!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="https://your-logo-url.com/logo.png" alt="PSC Logo" style="max-width: 200px; margin-bottom: 20px;">
        <h2 style="color: #48aaf9;">Félicitations! Votre équipe a été créée</h2>
        <p>Bonjour,</p>
        <p>Votre équipe a été créée avec succès sur la plateforme PSC. Voici les détails de votre équipe :</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333;">Détails de l'équipe</h3>
          <p><strong>Thème :</strong> ${teamData.selectedTheme}</p>
          <p><strong>Membres :</strong></p>
          <ul>
            ${teamData.selectedMembers.map(member => `
              <li>${member.name} (${member.email})</li>
            `).join('')}
          </ul>
        </div>
        <p>Vous pouvez maintenant vous connecter à votre espace équipe en utilisant votre code d'accès.</p>
        <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
        <p>Cordialement,<br>L'équipe PSC</p>
      </div>
    `
  }),
  
  welcomeEmail: (userData) => ({
    subject: 'Bienvenue sur PSC!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <img src="https://your-logo-url.com/logo.png" alt="PSC Logo" style="max-width: 200px; margin-bottom: 20px;">
        <h2 style="color: #48aaf9;">Bienvenue sur PSC!</h2>
        <p>Bonjour ${userData.name},</p>
        <p>Nous sommes ravis de vous accueillir sur la plateforme PSC. Votre compte a été créé avec succès.</p>
        <p>Vous pouvez maintenant vous connecter et commencer à utiliser toutes les fonctionnalités de la plateforme.</p>
        <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
        <p>Cordialement,<br>L'équipe PSC</p>
      </div>
    `
  })
};

// Function to send emails
const sendEmail = async (to, template, data) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      ...emailTemplates[template](data)
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = {
  sendEmail,
  emailTemplates
};
