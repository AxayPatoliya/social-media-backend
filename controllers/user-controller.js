import User from "../models/User.js";
import bcrypt from 'bcryptjs'

const getAllUser = async(req, res, next) => {
    let users;
    try{
        users = await User.find({}) //no search query is applied
    } catch(err){
        return console.error(err);
    }
    // if no users found
    if(!users){
        res.status(404).json({message:"No users found"})
    }
    return res.status(200).json({users}); //it is same as returning the users:users as it's ES6 then only {users} will work
}

const signUp = async(req, res, next) => {
    const { name, email, password } = req.body;
    // check for the user existance
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    } catch(err){
        return console.error(err);
    }

    if(existingUser){
        return res.status(400).json({message: "User already exists!! Login instead!!"})
    }

    // encrypt the password
    const hashedPassword = bcrypt.hashSync(password);
    // if user not there already then create a new one
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    })
    try{
        user.save();
    } catch(err){
        return console.error(err);
    }
    return res.status(201).json({user})
}

const logIn = async(req, res, next) => {
    const { email, password } = req.body;

    // check for the user existance
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    } catch(err){
        return console.error(err);
    }

    if(!existingUser){
        return res.status(404).json({message: "Couldn't find user by this Email!!"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect password!"});
    }
    return res.status(200).json({message: "Logged in successfully!"})
}

export { getAllUser, signUp, logIn };