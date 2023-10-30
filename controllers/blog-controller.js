import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

const getAllBlog = async(req, res, next) => {
    let blogs;
    try{
        blogs = await Blog.find({}) //no search query is applied
    } catch(err){
        console.error(err);
    }
    // if no blogs found
    if(!blogs){
        return res.status(404).json({message:"No blogs found"})
    }
    return res.status(200).json({blogs}); //it is same as returning the blogs:blogs as it's ES6 then only {blogs} will work
}

const addBlog = async(req, res, next) => {
    const { title, description, image, user } = req.body;

    // validate the user before adding blog to DB
    let existingUser;
    try{
        existingUser = await User.findById(user);
    } catch(err){
        console.error(err);
    }
    if(!existingUser){
        return res.status(400).json({message: "User not found in DB, so data won't be added!"})
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try{
        // await blog.save();
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch(err){
        console.error(err);
        return res.status(500).json({message: err})
    }
    return res.status(201).json({blog})
}

const updateBlog = async(req, res, next) => {
    const blogId = req.params.id;
    const { title, description } = req.body;

    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch(err){
        console.error(err);
    }

    if(!blog){
        return res.status(500).json({message: `Unable to update the blog - ${blogId}!`});
    }
    return res.status(200).json({ blog });
}

const getBlog = async(req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(blogId);
    } catch(err){
        console.error(err);
    }

    if(!blog){
        return res.status(404).json({message: `Unable to find the blog for the ID - ${blogId}!`});
    }
    return res.status(200).json({ blog });
}

const deleteBlog = async(req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndRemove(blogId).populate('user'); //by populating it with User, it will contain the User schema info as well
        await blog.user.blogs.pull(blog); //remoe the blog from user's blogs array as well
        await blog.user.save()
    } catch(err){
        console.error(err);
    }

    if(!blog){
        return res.status(500).json({message: `Unable to delete the blog - ${blogId}!`});
    }
    return res.status(200).json({ message: "Successfully deleted" });
}

const getByUserId = async(req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs"); //this will return the all the blogs for the specified userId
    } catch(err){
        console.error(err);
    }

    if(!userBlogs){
        return res.status(404).json({message: "No blogs found for the passed user"})
    }
    return res.status(200).json({blogs: userBlogs})
}

export { getAllBlog, addBlog, updateBlog, getBlog, deleteBlog, getByUserId };