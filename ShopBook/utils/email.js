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
    sgMail.setApiKey(
      "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"
    );
  }

  sendEmail() {
    return sgMail.send(this.mailOption)
  }
}

module.exports = EmailManagement;
