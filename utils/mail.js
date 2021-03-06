const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(data) {
    this.to = data.newUser.email;
    this.firstName = data.newUser.user.split(' ')[0];
    this.url = data.url;
    this.from = `Ecommerce<${process.env.EMAIL_FROM}>`;

    //Order Template
    this.order = data.order;
    this.products = data.products;
  }

  createTransportMethod() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'Sendgrid',
        auth: {
          user: process.env.EMAIL_SENDGRID_USERNAME,
          pass: process.env.EMAIL_SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  //SEND EMAIL

  async send(template, subject) {
    //1) RENDER HTML BASED ON THE PUG TEMPLATE
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      order: this.order,
      products: this.products,
    });
    //2) DEFINE EMAIL OPTIONS
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    //3) CREATE A TRANSPORT AND SEND EMAIL
    this.createTransportMethod().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send('welcome', 'Welcome to Ecommerce!');
  }

  async sendOrder() {
    await this.send(
      'order',
      ` Ecommerce Order Receipt # ${this.order.orderNumber}`
    );
  }
};
