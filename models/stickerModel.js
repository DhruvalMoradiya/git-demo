const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const stickerSchema = new mongoose.Schema({
    // identifier: { type: Number },
    userId: { type: ObjectId, ref: "users", required: true, unique: true },
    collectionId: { type: ObjectId, ref: "Collection", required: true },
    publisher: { type: String,},
    stickerImage: [],  // s3 link
    deletedAt: { type: Date },    
    isDeleted: { type: Boolean, default: false }
    

}, { timestamps: true })

module.exports = mongoose.model('Sticker', stickerSchema)