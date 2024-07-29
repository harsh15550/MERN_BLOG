import postData from "../controller/findBlogController.js";
import express from 'express'

const FindBlogRouter = express.Router();

FindBlogRouter.get("/blog/:id" , postData);

export default FindBlogRouter;  