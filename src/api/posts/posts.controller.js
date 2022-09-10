
const { deleteFile } = require('../../utils/middlewares/deleteFile.middleware');
const Post = require('./posts.model');


const postPost = async (req, res, next) =>{
    try {
<<<<<<< HEAD
        const posts = await new Post(req.body);
        

=======
        const posts = new Post(req.body);
        console.log(posts.image)
>>>>>>> 38106c5ce60e2b096432a8fbf435d8a69033c9c8
        //Vamos a recoger la imagen del formulario
        if(req.file){
            posts.image = req.file.path
        console.log(req.file.path)

        }
        const savedPost = await posts.save();
        return res.status(200).json(savedPost);
    } catch (error) {
        return res.status(500).json(error);
    }
}


const putPost = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const posts = new Post(req.body);
        posts._id = id;

        if(req.file){
            posts.image = req.file.path;
        }

        const postsDb = await Post.findByIdAndUpdate(id, posts);
        if(postsDb.image){
            deleteFile(postsDb.image)
        }
        return res.status(200).json(postsDb);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deletePost = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const posts = await Post.findByIdAndDelete(id);
        if(posts.image){
            deleteFile(posts.image);
        }
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = { postPost, putPost, deletePost};
