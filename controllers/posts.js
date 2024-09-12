const Posts = require("../models/post");
const { validationResult } = require('express-validator')
let postPerPage = 2;

exports.getAllPost = (req, res) => {

    const currentPage = +req.query.currentPage || 1;

    Posts.find()
        .skip((currentPage - 1) * postPerPage)//Pagination Logic
        .limit(postPerPage)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
}

//Fetching Post with Author
exports.getPostwithAuthor = (req, res) => {

    const currentPage = +req.query.currentPage || 1;
    const userId = req.query.userId;

    Posts
        .find({ author: userId.toString() })
        .skip((currentPage - 1) * postPerPage)//Skipping Post of previous pages
        .limit(postPerPage)
        .then(data => {

            if (data.length <= 0) {
                return res.status(404).json({ message: 'No Post Found added by the User' })
            }
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
}

//Getting Post By Popularity

exports.sortByPopularPost = (req, res) => {

    Posts
        .find()
        .sort({ likes: -1 })
        .then(data => {

            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })

}

exports.createBlogPost = (req, res, next) => {
    const { title, content, userId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg })
    }
    let newPost = new Posts({
        title: title,
        content: content,
        author: userId
    })

    newPost.save()
        .then((result => {
            res.status(201).json({ message: 'Post Created Succesfully!!' })
        }))
        .catch(err => {
            console.log(err, 'Error for Add Post')
        })
}

//Updating Post
exports.updatePost = (req, res, next) => {
    const { title, content, userId, postId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array()[0].msg })
    }

    Posts
    .findById(postId.toString())
        .then(postDetails => {
            if (!postDetails) {
                return res.status(404).json({ message: 'Post Not Found' })
            }

            if (postDetails.author.toString() !== userId) {
                return res.status(200).json({ message: 'User cannot edit this post' })
            }

            postDetails.title = title;
            postDetails.content = content;
            postDetails.updatedAt = Date.now()
         
            return postDetails.save()
                .then(result => {
                    res.status(201).json({ message: 'Post Updated Successfully' })
                })
        })
        .catch(err => {
            console.log(err, 'Error for Updating Post')
        })

}

exports.deletePost = (req, res) => {

    const postId = req.query.postId;
    const userId = req.query.userId;

    if (!postId || !userId) {
        return res.status(400).json({ message: 'Post ID and User ID are required' });
    }

    //Checking  whether this post was added by the current user with userId and postId
    Posts.deleteOne({ author: userId, _id: postId })
        .then(result => {
            if (result.deletedCount > 0) res.status(200).json({ message: "Post Deleted Sucessfully" });
            else res.status(400).json({ message: "Post Not Deleted" });
        })
        .catch(err => {
            console.log(err, 'Error for Delete Post')
        })
}

exports.likePost = (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;

    Posts.findById(postId)
        .then((data) => {
            data.likes.push(userId)

            return data.save()
                .then(result => {
                    res.status(201).json({ message: 'Post Liked Successfully' })
                })
        })
        .catch(error => console.log(error, 'Errors'))
}



exports.unLikePost = (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;


    Posts.findById(postId)
        .then((data) => {

            //Deleting the Author Id From  Likes Array 
            let index = data.likes.indexOf(userId)
            data.likes.splice(index, 1)
            return data.save()
                .then(result => {
                    res.status(201).json({ message: 'Post Unliked!!' })
                })
        })
        .catch(error => console.log(error, 'Errors'))
}