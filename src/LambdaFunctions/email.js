const AWS = require("aws-sdk");

exports.handler = function(event, context) {
  AWS.config.update({ region: "eu-west-1" });
  console.log('Handling confirmation email to', event);
  
  if (!event.email.match(/^[^@]+@[^@]+$/)) {
    console.log('Not sending: invalid email address', event);
    context.done(null, "Failed");
    return;
  }

  const name = event.name.substr(0, 40).replace(/[^\w\s]/g, '');

  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <p>Hi ${name},</p>
        <p>...</p>
      </body>
    </html>
  `;

  const textBody = `
    Hi ${name},
    ...
  `;

  // Create sendEmail params
  const params = {
    Destination: {
      ToAddresses: [event.email]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody
        },
        Text: {
          Charset: "UTF-8",
          Data: textBody
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Thanks for registering with MK!"
      }
    },
    Source: "Moe from MK <moradd70@google.com>"
  };

  // Create the promise and SES service object
  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(data => {
      console.log(data.MessageId);
      context.done(null, "Success");
    })
    .catch(err => {
      console.error(err, err.stack);
      context.done(null, "Failed");
    });
};