const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(data) {
    this.to = data.newUser.email;
    this.firstName = data.newUser.user.split(' ')[0];
    this.url = data.url;
    this.from = `Ecommerce<${process.env.EMAIL_FROM}>`;
    this.orderNumber = data.orderNumber;
    this.suit = data.suit;
    this.street = data.street;
    this.city = data.city;
    this.zipecode = data.zipecode;
    this.province = data.province;
    this.country = data.country;
    this.delivery_date = data.delivery_date;
    this.delivery_time = data.delivery_time;
    this.delivery = data.delivery;
    this.items = data.items;
    this.product_price = data.product_price;
    this.delivery = data.delivery;
    this.total = data.total;
    this.products = data.products;
  }

  createTransportMethod() {
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
      orderNumber: this.orderNumber,
      suit: this.suit,
      street: this.street,
      city: this.city,
      zipecode: this.zipecode,
      province: this.province,
      country: this.country,
      delivery_date: this.delivery_date,
      delivery_time: this.delivery_time,
      delivery: this.delivery,
      items: this.items,
      product_price: this.product_price,
      total: this.total,
      url: this.url,
      subject,
      products: this.products,
      delivery: this.delivery,
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
    await this.send('order', ` Ecommerce Order Receipt # ${this.orderNumber}`);
  }
};
