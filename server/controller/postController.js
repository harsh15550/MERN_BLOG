import postModel from "../model/postModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';

const postAdd = async (req, res) => {
    try {
        const info = req.user;
        const { title, description, category, summary } = req.body;

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'blog_images', // Folder in Cloudinary
        });

        // Create a new post with the Cloudinary image URL
        const newPost = new postModel({
            title,
            description,
            category,
            auther: info.userId,
            image: result.secure_url,  // Save Cloudinary image URL in DB
            summary
        });

        await newPost.save();  // Save the post

        res.status(201).json({ message: "Blog added successfully" });
    } catch (error) {
        console.log(error);  // Log error for debugging
        return res.status(500).json({ error: error.message });
    }
};


export const findAllPost = async (req , res) => {
    const postData = await postModel.find().populate("auther");
    res.json(postData);
} 

export const searchPost = async (req, res) => {
    const { category, title, auther, username } = req.query;
    const queryObject = {};

    if (category) {
        queryObject.category = { $regex: category, $options: "i" };
    }

    if (title) {
        queryObject.title = { $regex: title, $options: "i" };
    }

    if (auther) {
        queryObject["auther.username"] = { $regex: auther, $options: "i" };
    }

    if (username) {
        queryObject["author.username"] = { $regex: username, $options: "i" };
    }

    try {
        const postData = await postModel.find(queryObject).populate("auther");
        if (postData) {
            res.json({ postData });
        } else {
            res.status(404).json({ message: "No posts found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePost = async (req , res) => {
    try {
        const post = await postModel.findByIdAndDelete(req.params.id);
        if(!post) {
            return res.json({message : "Not Post Found" , success : false})
        }
        return res.json({message : "Blog Deleted", success : true});
    } catch (error) {
        console.log(error.message);
    }
}


export default postAdd  