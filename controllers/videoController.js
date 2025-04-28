import mongoose from 'mongoose';
import Video from '../models/Video.js';

// Controller to get paginated videos
export const getVideos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const videos = await Video.find()
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

// Controller to search videos
export const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const videos = await Video.find({
      $text: { $search: query },
    });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search videos' });
  }
};

// Ensure text index is created on the Video model
mongoose.connection.once('open', async () => {
  try {
    await Video.collection.createIndex({ title: 'text', description: 'text' });
    console.log('Text index created on title and description fields');
  } catch (error) {
    console.error('Error creating text index:', error);
  }
});