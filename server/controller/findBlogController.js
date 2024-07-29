import postModel from '../model/postModel.js'

const postData = async (req , res) => {
    try {
        const postId = req.params.id;
        const posts = await postModel.findById(postId).populate('auther');
        res.json({posts , success : true});
    } catch (error) {
        res.json(error);
    }
}

export default postData;