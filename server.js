const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Cambia el puerto según tu configuración

app.use(bodyParser.urlencoded({ extended: true }));

// Configuración básica de nodemailer (usa tus propias credenciales)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña',
  },
});

// Ruta para manejar la suscripción
app.post('/api/suscribirse', (req, res) => {
  const email = req.body.email;

  // Configura el correo
  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: email,
    subject: '¡Gracias por suscribirte!',
    text: 'Bienvenido a nuestra tienda. Gracias por suscribirte a nuestras novedades.',
  };

  // Envía el correo
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ message: 'Error al enviar el correo.' });
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).json({ message: 'Te has suscrito correctamente.' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
