const stickerModel = require('../models/stickerModel')
const { uploadFile } = require('../aws/fileUpload')
const ObjectId = require('mongoose').Types.ObjectId
const mongoose = require('mongoose')

const isValid = function (x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;
    return true;
};
const isValidBody = function (x) {
    return Object.keys(x).length > 0;
};


const addSticker = async function (req, res) {
    try {
        let body = req.body
        let { userId,collectionId } = body

        if (!isValidBody(body)) return res.status(400).send({ status: false, message: "Body cannot be blank" })
        //fname validation and fname regex
        if (!ObjectId.isValid(collectionId)) return res.status(400).send({ status: false, message: "collection Id is invalid" })
        if (!isValid(collectionId)) return res.status(400).send({ status: false, message: "Collection Id is required" })

        if (!ObjectId.isValid(userId)) return res.status(400).send({ status: false, message: "userId is invalid" })
        if (!isValid(userId)) return res.status(400).send({ status: false, message: "userId is required" })



        let uploadedFileURL = [];
        let files = req.files
        if (files && files.length > 0) {
            for (var i = 0; i < req.files.length; i++) { 
                let x = await uploadFile(files[i]);
                uploadedFileURL.push(x);
            }
        }
        else res.status(400).send({ message: "No file found. Please add a sticker image" })

        body["stickerImage"] = uploadedFileURL


        let stickerData = await stickerModel.create(body)
        return res.status(201).send({ status: true, message: "sticker created successfully", stickerData })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server side Errors. Please try again later", error: error.message })
    }
}


const getSticker = async function (req, res) {
    try {
        let data = req.query;

        if (data.collectionId) {
            if (!mongoose.isValidObjectId(data.collectionId)) {
                return res.status(400).send({ status: false, msg: "Please Enter a valid collectionId" })
            }
        }
        const stickerDetail = await stickerModel.find({ $and: [data] })
            .select({ stickerImage: 1 })

        if (stickerDetail.length == 0) {
            return res.status(404).send({ status: false, msg: "No sticker found" });
        }

        if (stickerDetail.length > 0) {
            return res.status(200).send({ status: true, message: "stickers List", data: stickerDetail });
        }
        else {
            return res.status(404).send({ status: false, message: "No sticker found" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


const deleteSticker = async function (req, res) {
    try {
        let stickerId = req.params.stickerId;

        let sticker = await stickerModel.findOne({ _id: stickerId, isDeleted: false })
        if (!sticker) { return res.status(404).send({ status: false, message: "sticker does not exist" }) }

        await stickerModel.updateMany({ _id: stickerId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: new Date() } })

        return res.status(200).send({ status: true, message: "sticker deleted successfully" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}
module.exports = { addSticker, getSticker,deleteSticker }