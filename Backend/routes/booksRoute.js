import express from "express"
import { Book } from "../models/bookModel.js";

const router = express.Router();

// For get all books from database
router.get('/', async (req, res) => {
    try {
        const allBooks = await Book.find({});
        return res.status(200).json({ count: allBooks.length, data: allBooks })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// For create a book at database
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Send all required fields: title, author, publishYear" })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// For get one book from database by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// For update a book
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields : title, author, publishYear",
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Book not found" })
        }
        return res.status(200).json({ message: "Book updated successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found!" })
        }

        return res.status(200).send("Book delete successfully✅")
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router;