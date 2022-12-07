const sgMail = require("@sendgrid/mail");
const config = require("../config.js");

class EmailManagement {
  constructor(to, subject, html) {
    this.mailOption = {
      to: to,
      from: config.FROM_EMAIL,
      subject: subject,
      html: html,
    };
    sgMail.setApiKey(config.EMAIL_API_KEY);
  }

  sendEmail() {
    return sgMail.send(this.mailOption);
  }
}

module.exports = EmailManagement;
