const Mailer = require('./mailer/Mailer');
const amqp = require('amqplib/callback_api');
const rabbitMqConfig = require('./config/appsettings.json').RabbitMQ;


// Mailer.SendMail(
//     'Привет',
//     'Привет подзаголовок',
//     `'This <i>message</i> was sent from <strong>Node js</strong> server.',`,
//     'fscvpwvosji@uniromax.com',
//     'xecema7212@rubygon.com'
// )

amqp.connect(rabbitMqConfig.serverUrl || 'amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    console.log('Successful connection to RabbitMQ server');

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        console.log('Successful creation of the RabbitMQ channel');


        channel.assertQueue(rabbitMqConfig.queue, {
            durable: false
        })

        channel.consume(rabbitMqConfig.queue, function(msg) {
            let mail = JSON.parse(msg.content.toString());

            Mailer.SendMail(
                mail.subject,
                mail.text,
                mail.html,
                mail.to
            )
        }, {
            noAck: true
        });
    })
});