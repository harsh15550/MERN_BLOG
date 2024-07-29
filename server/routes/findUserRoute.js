import express from 'express';
import findOneUser, { findUserUpdate } from '../controller/findUserController.js';
import upload from '../middleware/multer.js';
 
const findUserRouter = express.Router();

findUserRouter.get("/user/:id",findOneUser);
findUserRouter.put("/update/:id", upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), findUserUpdate);
export default findUserRouter;