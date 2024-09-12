const Router = require('express').Router()
const postController = require('../controllers/posts');
const { body } = require('express-validator');

Router.get('/posts', postController.getAllPost);
Router.get('/userPosts', postController.getPostwithAuthor);
Router.get('/getPopularPosts', postController.sortByPopularPost);


Router.post('/createPost', [
    body('title', 'Enter Valid Post Title').isString().trim().isLength({ min: 5 }),
    body('content', 'Content Should be atleast have 5 characters').trim().isString().isLength({ min: 5 }),
]
    , postController.createBlogPost);


Router.put('/updatePost', [
    body('title', 'Enter Valid Post Title').isString().trim().isLength({ min: 5 }),
    body('content', 'Content Should be atleast have 5 characters').trim().isString().isLength({ min: 5 }),
]
    , postController.updatePost);

Router.delete('/deletePost', postController.deletePost)


Router.put('/likePost', postController.likePost)
Router.put('/unLikePost', postController.unLikePost)

module.exports = Router;
