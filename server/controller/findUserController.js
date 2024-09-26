import userModel from "../model/userModel.js";
import { v2 as cloudinaryV2 } from 'cloudinary';

const findOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = await userModel.findById(id);
        if(!id){
            return res.status(404).json({message : "id not found"});
        }
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }  
        res.json( userData );  
    } catch (error) {
        console.log("error" + error);
        res.status(500).json({ message: "Server error" });
    }
}; 

export const findUserUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });

        if (req.files) {
            // If profile image is uploaded, upload to Cloudinary
            if (req.files.profile) {
                const profileResult = await cloudinaryV2.uploader.upload(req.files.profile[0].path);
                user.profile = profileResult.secure_url; // Store the Cloudinary URL
            }

            // If banner image is uploaded, upload to Cloudinary
            if (req.files.banner) {
                const bannerResult = await cloudinaryV2.uploader.upload(req.files.banner[0].path);
                user.banner = bannerResult.secure_url; // Store the Cloudinary URL
            }
        }

        await user.save();
        res.json({ success: true, user, message: "Update Successfully" });
    } catch (error) {
        res.json({ error: error.message });
    }
}

export default findOneUser;
