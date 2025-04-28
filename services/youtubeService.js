import axios from 'axios';
import Video from '../models/Video.js';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

// Function to fetch videos from YouTube API
export const fetchVideos = async () => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: 'snippet',
        q: 'reactjs', // Replace with your search query
        type: 'video',
        order: 'date',
        maxResults: 10,
        key: YOUTUBE_API_KEY,
      },
    });

    const videos = response.data.items;

    for (const video of videos) {
      const { title, description, publishedAt, thumbnails } = video.snippet;
      const videoId = video.id.videoId;

      // Save video to database if it doesn't already exist
      await Video.updateOne(
        { videoId },
        { title, description, publishedAt, thumbnails, videoId },
        { upsert: true }
      );
    }

    console.log('Videos fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
};