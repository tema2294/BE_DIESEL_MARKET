import mongoose from "mongoose";

const Media = new mongoose.Schema({
    filename: {type: String, unique: true},
    alt: {type: String, unique: true},
})

export default mongoose.model("Media",Media)
