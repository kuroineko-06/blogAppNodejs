const router = require('express').Router();

const multer_thumbnail = require('../middlewares/multer_thumbnail');
const multer_image = require('../middlewares/multer-image');
const { createPost, deletePost, updatePost,
    getPost, getFeaturedPosts, getPosts,
    searchPost, getRelatedPosts, uploadImage }
    = require('../controler/post');
const { postValidator, validate } = require('../middlewares/postValidator');
const { parseData } = require('../middlewares/index');

router.post(
    '/create',
    multer_thumbnail,
    parseData,
    postValidator,
    validate,
    createPost);
    

router.put(
    '/:postId',
    multer_thumbnail,
    parseData,
    postValidator,
    validate,
    updatePost);

router.delete('/:postId', deletePost);
router.get('/single/:slug', getPost);
router.get('/featured-posts', getFeaturedPosts);


router.get('/posts', getPosts);
router.get('/search', searchPost);
router.get('/related-posts/:postId', getRelatedPosts);
router.post('/upload-image', multer_image, uploadImage)


module.exports = router;