// src/services/email.service.js

const nodemailer = require("nodemailer");

// Configurar el transporte de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Tu correo de Gmail
    pass: process.env.EMAIL_PASS, // Tu contraseña o app password de Gmail
  },
});

// Función para enviar el correo
const sendTestLinkEmail = async (email, testLink) => {
  const mailOptions = {
    from: "borkoloco@gmail.com", // Remitente
    to: email, // Destinatario
    subject: "Acceso a tu test", // Asunto
    text: `Haz clic en el siguiente enlace para acceder a tu test: ${testLink}`, // Texto del mensaje
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

module.exports = { sendTestLinkEmail };
