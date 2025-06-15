import express from "express"
import cors from 'cors';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import 'dotenv/config'
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import findUserRouter from "./routes/findUserRoute.js";
import FindBlogRouter from "./routes/findBlogroute.js";
import { v2 as cloudinary } from 'cloudinary';

mongoose.connect(process.env.DB_CONNECT).then(() => console.log("DB CONNECT")).catch(() => console.log("CONNECTION FAILED"))

const PORT = process.env.PORT || 3000;

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json());
app.use("/image", express.static("upload"))
app.use(cors({
  // origin: 'https://blogapplatest.netlify.app',
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// API
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/findUser", findUserRouter);
app.use("/api/findBlog", FindBlogRouter);

app.get("/", function (req, res) {
  res.send("Hello World");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})  