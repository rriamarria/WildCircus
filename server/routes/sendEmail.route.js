const express = require("express");
const router = express.Router();
const sgMail = require('@sendgrid/mail');
require('dotenv').config();




sgMail.setApiKey(process.env.SENDGRID_API_KEY);




router.post('/sendemail', (req, res) => {
    const email = 'mariafmarinescu@outlook.com';
    const user =  req.body.email;
    const name = req.body.name;
    const message = req.body.message;
    const text = `Hello, my name is ${name}. ${message}`;
    const html = `<strong>Hello, my name is ${req.body.name}.${req.body.message}</strong>`;
    if(typeof req !== undefined && req !== null) {
        const msg = {
            to: 'mariafmarinescu@outlook.com',
            from: user,
            subject: 'Wild Circus - contact email',
            text: text,
            html: html,
        };
       

            sgMail
  .send(msg)
  .then(() => {
    res.status(200).json('E-mail sent!')
  })
  .catch(error => {

    //Log friendly error
    console.error(error.toString());

    //Extract error msg
    const {message, code, response} = error;
    res.status(500).json(`Failed sending the email : ${error.toString()}`)
    //Extract response msg
    const {headers, body} = response;
  });
        

   
}})

module.exports = router;