import express from 'express';

import mongoose_connection from '../db/connection.js'

import { getAllBlog, addBlog, updateBlog, getBlog, deleteBlog, getByUserId } from '../controllers/blog-controller.js';

const router = express.Router();

// get list of the blogs
router.get('/', getAllBlog)

// add a new blog
router.post('/add', addBlog)

// update a blog
router.put('/update/:id', updateBlog)

// get a blog
router.get('/:id', getBlog)

// delete a blog
router.delete('/delete/:id', deleteBlog)

// get the blogs for specific user
router.get('/user/:id', getByUserId)

// module.exports = router
export default router