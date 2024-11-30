import express from 'express';
import { submitRating, getUserRatings } from '../Controllers/rating.controller.js';

const router = express.Router();

// Route to submit a rating
router.post('/submit', submitRating);

// Route to get ratings for a user
router.get('/:userId/ratings', getUserRatings);

export default router;
