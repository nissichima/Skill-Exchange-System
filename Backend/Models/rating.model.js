import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who rates
    ratedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user being rated
    rating: { type: String, enum: ['good', 'bad'], required: true },
    feedback: { type: String, required: true },
}, { timestamps: true });

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
