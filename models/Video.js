import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  publishedAt: { type: Date, required: true },
  thumbnails: { type: Object },
  videoId: { type: String, unique: true, required: true },
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);