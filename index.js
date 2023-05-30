if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const PORT = process.env.PORT || 3001

const app = express()

app.post(`${process.env.ENDPOINT}`, (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `

  const main = async () => {
    let transporter = nodemailer.createTransport({
      host: process.env.NODEMAILHOST,
      port: process.env.NODEMAILPORT,
      secure: true,
      auth: {
        user: process.env.NODEMAILERUSER,
        pass: process.env.NODEMAILERPASSWORD
      }
    })

    let info = await transporter.sendMail({
      from: '"Nodemailer" <contact@gmail.com>',
      to: process.env.EMAIL,
      subject: 'Contact Request',
      text: '',
      html: output
    })

    console.log('Message sent: %s', info.messageId)

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  }
  main().catch(console.error)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
