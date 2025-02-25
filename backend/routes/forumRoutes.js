const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/posts', forumController.getPosts);
router.get('/posts/:id', forumController.getPost);

// Protected routes
router.post('/posts', protect, forumController.createPost);
router.post('/posts/:id/comments', protect, forumController.addComment);
router.put('/posts/:id', protect, forumController.updatePost);
router.delete('/posts/:id', protect, forumController.deletePost);
router.post('/posts/:id/like', protect, forumController.likePost);

// Moderator/Admin routes
router.put('/posts/:id/lock', 
    protect, 
    authorize('admin', 'moderator'), 
    forumController.lockPost
);
router.put('/posts/:id/pin', 
    protect, 
    authorize('admin', 'moderator'), 
    forumController.pinPost
);

module.exports = router;
