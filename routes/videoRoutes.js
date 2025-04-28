import express from 'express';
import { getVideos, searchVideos } from '../controllers/videoController.js';

const router = express.Router();

// Route to get paginated videos
router.get('/videos', getVideos);

// Route to search videos
router.get('/videos/search', searchVideos);

export default router;