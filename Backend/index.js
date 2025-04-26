import express, { response } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors"

dotenv.config()
const app = express();

const port = process.env.PORT || 3000;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow all original with default of cors(*)
app.use(cors());

// Option 2: Allow Custom origins
app.use(cors({
    origin: `${process.env.CLIENT_BASE_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type']
}))

//For testing 
app.get('/', (req, res) => {
   res.send("Hello from backend!")
})

app.use('/books', bookRoute);


mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB Connected successfully!");
    app.listen(port, () => {
        console.log(`App is listining at port ${port}`);
    })

}).catch((error) => {
    console.log(error);
})

