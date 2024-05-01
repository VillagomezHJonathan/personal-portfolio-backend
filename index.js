if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const nodemailer = require('nodemailer')

const PORT = process.env.PORT || 3001
const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

app.get('/', (req, res) => {
  res.json({message: 'TEST'})
})

app.post('/', (req, res) => {

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
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.EMAIL,
      subject: 'Contact Request',
      text: '',
      html: output
    })
  }

  main()
    .then(() => {
      res.json({ message: 'Succesfully sent email!' })
    })
    .catch((err) => {
      console.error(err)
      res.json({ message: 'Unsuccesful in sending email!' })
    })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
