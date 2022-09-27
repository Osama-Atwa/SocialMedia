const express = require('express');


const checkAuth = require('../middleware/check-auth');
const extractImage = require('../middleware/file');

const PostsController = require('../controllers/posts');
const router = express.Router();




router.post('',
checkAuth,
extractImage,
PostsController.addPost
);

router.get('',PostsController.getPosts);

router.put('/:id',
checkAuth,
extractImage,
PostsController.editPost
);

router.get('/:id',
PostsController.getPost
);

router.delete('/:id',
checkAuth,
PostsController.deletPost
);

module.exports = router;
