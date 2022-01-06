const Mailer = require('./mailer/Mailer');

Mailer.SendMail(
    'Message from class',
    'This message was sent from Node js server',
    `'This <i>message</i> was sent from <strong>Node js</strong> server.',`,
    'fscvpwvosji@uniromax.com',
    'xecema7212@rubygon.com'
)
