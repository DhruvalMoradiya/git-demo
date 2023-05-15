const aws = require("aws-sdk")
require('aws-sdk/lib/maintenance_mode_message').suppress = true;


////////////////////////////*AWS*//////////////////////////////////////////////////////////////////

aws.config.update({
    accessKeyId: "AKIASEFZMCKCVOH6QB6Q",
    secretAccessKey: "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",
    region: "ap-south-1"
})


let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        
        // this function will upload file to aws and return the link
        let s3 = new aws.S3({ apiVersion: '2012-10-17' }); // we will be using the s3 service of aws

        var uploadParams = {
            // ACL: "public-read",
            Bucket: "sticky-stroke",  
            Key: "sticky/" + file.originalname, 
            Body: file.buffer
        }


        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            // console.log(data.Location)
            // console.log("file uploaded succesfully")
            // console.log(data.Location)
            return resolve(data.Location)
        })
    })
}

module.exports ={uploadFile}