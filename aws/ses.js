const AWS = require("aws-sdk");
const env = require("dotenv");
env.config();

const awsConfig = {
    accessKeyId: "AKIASEFZMCKCVOH6QB6Q",
    secretAccessKey: "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",
    region: "ap-south-1"
}

const SES = new AWS.SES(awsConfig);


const sendEmail = async (userEmail,otp) => {
    // const email = process.env.FROM_EMAIL
    // const shortCode = nanoid(6).toUpperCase()

    try{

        const params = {
            Destination: {
              ToAddresses: [userEmail] // Change to your recipient
            },
            Message: {
              Body: {
                Html: {
                  Charset: 'UTF-8',
                  Data: `<h1>Your verification code is ${otp}</h1>`
                }
              },
              Subject: {
                Charset: 'UTF-8',
                Data: `OTP Verification`
              }
            },
            Source: 'sunilgolani880@gmail.com' // Change to your sender
          };
          
          // Send the email
          SES.sendEmail(params, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Email sent: ${data.MessageId}`);
            }
          });
    }catch (error){
        console.log("errrr::::::",error)
    }
}




module.exports ={sendEmail}