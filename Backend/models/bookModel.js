import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        requird: true
    },
    author: {
        type: String,
        requird: true
    },
    publishYear: {
        type: Number,
        requird: true
    },
    
},{timestamps: true});

export const Book = mongoose.model("book", bookSchema)