var nodemailer = require('nodemailer');


exports.Send_Email = function (ToEmail ,  data) {
 

 var hbs = require('nodemailer-express-handlebars');
 var options = {
     viewEngine: {
         extname: '.hbs',
         layoutsDir: 'views/email/',
         defaultLayout : 'template',
         partialsDir : 'views/partials/'
     },
     viewPath: 'views/email/',
     extName: '.hbs'
 };
 var sgTransport = require('nodemailer-sendgrid-transport');
//using sendgrid as transport, but can use any transport.
 var send_grid = {
     auth: {
         api_user: 'myusername',
         api_key: 'mypassword'
     }
 }
 

 var mailer = nodemailer.createTransport(sgTransport(send_grid));
  mailer.use('compile', hbs(options));
 mailer.sendMail({
     from: 'test@test.com',
     to: ToEmail,
     subject: 'Any Subject',
     template: 'email_body',
     context: data
 }, function (error, response) {
     console.log(error);
     console.log(response);
     console.log('mail sent ');
     mailer.close();
 });
}
