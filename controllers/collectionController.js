const collectioModel = require('../models/collectionModel')
const { uploadFile } = require('../aws/fileUpload')
const ObjectId = require('mongoose').Types.ObjectId


const isValid = function (x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;
    return true;
};
const isValidBody = function (x) {
    return Object.keys(x).length > 0;
};

const addCollection = async function (req, res) {
    try {
        let body = req.body
        let { collectionName, publisher } = body


        if (!isValidBody(body)) return res.status(400).send({ status: false, message: "Body cannot be blank" })

        if (!isValid(collectionName)) return res.status(400).send({ status: false, message: "Collection Name is required" })
        if (!isValid(publisher)) return res.status(400).send({ status: false, message: "Publisher Name is required" })

        let uploadedFileURL
        let files = req.files
        if (files && files.length > 0) uploadedFileURL = await uploadFile(files[0])
        else res.status(400).send({ message: "No file found. Please add a collection image" })

        body["collectionImage"] = uploadedFileURL


        let collectionData = await collectioModel.create(body)
        return res.status(201).send({ status: true, message: "collection created successfully", collectionData })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server side Errors. Please try again later", error: error.message })
    }
}


const getCollection = async function (req, res) {
    try {
        let data = req.query;

        const collectionDetail = await collectioModel
            .find({ $and: [data] })
            .select({

                collectionName: 1,
                publisher: 1,
                collectionImage:1,
            })


        if (collectionDetail.length == 0) {
            return res.status(404).send({ status: false, msg: "No Collection found" });
        }

        if (collectionDetail.length > 0) {
            return res.status(200).send({ status: true, message: "Collection List", data: collectionDetail });
        }
        else {
            return res.status(404).send({ status: false, message: "No Collection found" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


module.exports = { addCollection, getCollection }