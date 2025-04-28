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
    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search videos' });
  }
};