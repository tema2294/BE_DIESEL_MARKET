import mongoose from "mongoose";

const Item = new mongoose.Schema({
    itemName: {type: String,unique: true},
    price: {type: Number},
    images: [{type: String}],
    description: { type: String },
    article: { type: String },
    categoryName: {type: String, ref: 'Category'},
})

export default mongoose.model("Item",Item)
