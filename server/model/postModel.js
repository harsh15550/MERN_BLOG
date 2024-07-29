import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type: String,
        require : true
    },
    description:{
        type: String,
        require : true
    },
    image : {
        type: String,
        require : true
    }, 
    summary : {
        type : String,
        require : true
    },
    date : {
        type: Date,
        default: Date.now
    },
    category : {
        type: String,
        require : true
    },
    auther : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
})

const postModel = mongoose.model("post" , postSchema);
export default postModel;