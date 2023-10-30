import express from 'express';

import mongoose_connection from '../db/connection.js'

import { getAllUser, signUp, logIn } from '../controllers/user-controller.js';

const router = express.Router();

// get list of the users
router.get('/', getAllUser)

// create the user
router.post('/signup', signUp)

// login the user
router.post('/login', logIn)



// module.exports = router
export default router