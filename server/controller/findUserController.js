import userModel from "../model/userModel.js";

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

export const findUserUpdate = async (req , res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndUpdate(id , req.body , {new : true});
        if (req.files) {   
            if (req.files.profile) {
                user.profile = req.files.profile[0].filename;
            }
            if (req.files.banner) {
                user.banner = req.files.banner[0].filename;
            }
        }
        
        await user.save();
        res.json({success : true ,user , message : "Udate Successfully"})
    } catch (error) {
        res.json({error : error.message})
    }
}

export default findOneUser;
