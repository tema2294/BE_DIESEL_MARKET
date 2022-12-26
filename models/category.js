import mongoose from "mongoose";

const Category = new mongoose.Schema({
    categoryName: {type: String, unique: true},
    categoryDisplayName:{type: String, unique: true},
    categorySeoDescription: {type: String},
    categoryImage: {type: String},
})

export default mongoose.model("Category", Category)
