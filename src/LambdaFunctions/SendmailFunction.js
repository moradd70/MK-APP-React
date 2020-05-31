var aws = require('aws-sdk');
var ses = new aws.SES({region: 'us-east-1'});

exports.handler = (event, context, callback) => {
    
     var params = {
        Destination: {
            ToAddresses: ["moradd70@gmail.com"]
        },
        Message: {
            Body: {
                Text: { Data: "MK Contact Form Message"
                    
                }
                
            },
            
            Subject: { Data: "Thank you, your message has been received"
                
            }
        },
        Source: "moradd70@gmail.com"
    };

    
     ses.sendEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err);
        } else {
            
            console.log(data);
            context.succeed(event);
        }
    });
};