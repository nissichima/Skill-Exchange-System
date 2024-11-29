import Session from '../Models/session.model.js';
import Rating from '../Models/rating.model.js';

// Function to handle rating submission
export const submitRating = async (req, res) => {
    try {
        const { sessionId, rating, feedback, ratedUser } = req.body;

        // Find the session by ID
        const session = await Session.findById(sessionId);
        console.log("Session Found: ", session); // Debugging
        if (!session) {
            return res.status(400).json({ error: 'Session not found' });
        }

        // Calculate the session end time by adding the duration to the start time
        const sessionEndTime = new Date(session.dateTime);
        sessionEndTime.setMinutes(sessionEndTime.getMinutes() + session.duration);

        // Check if the session has ended
        if (sessionEndTime > new Date()) {
            return res.status(400).json({ error: 'Session is not yet completed.' });
        }

        // Create a new rating
        const newRating = new Rating({
            sessionId,
            ratedBy,
            ratedUser,
            rating,
            feedback,
        });

        await newRating.save();

        // Optionally, update the rated user's profile with the new rating (e.g., rating average)

        res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });
    } catch (error) {
        console.log('Error submitting rating:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to get all ratings for a user
export const getUserRatings = async (req, res) => {
    try {
        const userId = req.params.userId;

        const ratings = await Rating.find({ ratedUser: userId }).populate('ratedBy', 'username');

        res.status(200).json({ ratings });
    } catch (error) {
        console.log('Error getting user ratings:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
