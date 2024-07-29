import express from 'express'
import postAdd, { findAllPost, searchPost } from '../controller/postController.js'
import upload from '../middleware/multer.js';
import tokenVerify from '../middleware/tokenVerify.js';

const postRouter = express.Router();

postRouter.post("/add" , upload.single("image") , postAdd);
postRouter.get("/findpost" , findAllPost);
postRouter.get("/search" , searchPost);

export default postRouter;   