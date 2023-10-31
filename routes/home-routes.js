import express from 'express';
import navigateUser from '../controllers/home-controller.js';

const router = express.Router();

// navigate the user towards endpoints
router.get('/', navigateUser)


// module.exports = router
export default router