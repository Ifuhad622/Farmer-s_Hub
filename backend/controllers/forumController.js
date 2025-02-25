const Post = require('../models/Post');
const Comment = require('../models/Comment');

class ForumController {
    async createPost(req, res) {
        try {
            const { title, content, category } = req.body;
            const post = await Post.create({
                title,
                content,
                category,
                author: req.user.id
            });

            return res.status(201).json({
                success: true,
                data: post
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error creating post',
                error: error.message
            });
        }
    }

    async getPosts(req, res) {
        try {
            const { category, page = 1, limit = 10 } = req.query;
            const query = category ? { category } : {};

            const posts = await Post.find(query)
                .populate('author', 'name')
                .sort('-createdAt')
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Post.countDocuments(query);

            return res.status(200).json({
                success: true,
                data: posts,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching posts',
                error: error.message
            });
        }
    }

    async addComment(req, res) {
        try {
            const { postId } = req.params;
            const { content } = req.body;

            const comment = await Comment.create({
                content,
                post: postId,
                author: req.user.id
            });

            return res.status(201).json({
                success: true,
                data: comment
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error adding comment',
                error: error.message
            });
        }
    }
}

module.exports = new ForumController();
