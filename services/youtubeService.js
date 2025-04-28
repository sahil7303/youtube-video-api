import axios from 'axios';
import Video from '../models/Video.js';
import dotenv from 'dotenv';
dotenv.config();

const YOUTUBE_API_KEYS = process.env.YOUTUBE_API_KEYS
  ? (process.env.YOUTUBE_API_KEYS.includes(',')
      ? process.env.YOUTUBE_API_KEYS.split(',')
      : [process.env.YOUTUBE_API_KEYS])
  : [];

if (YOUTUBE_API_KEYS.length === 0) {
  throw new Error('No YouTube API keys provided. Please set YOUTUBE_API_KEYS in the .env file.');
}

let currentKeyIndex = 0;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const getNextApiKey = () => {
  currentKeyIndex = (currentKeyIndex + 1) % YOUTUBE_API_KEYS.length;
  return YOUTUBE_API_KEYS[currentKeyIndex];
};

// Function to fetch videos from YouTube API
export const fetchVideos = async () => {
  try {
    let response;
    let success = false;

    for (let i = 0; i < YOUTUBE_API_KEYS.length; i++) {
      const apiKey = YOUTUBE_API_KEYS[currentKeyIndex];
      try {
        response = await axios.get(YOUTUBE_API_URL, {
          params: {
            part: 'snippet',
            q: 'reactjs', // Predefined search query
            type: 'video',
            order: 'date',
            maxResults: 10,
            key: apiKey,
          },
        });
        success = true;
        break;
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error(`API key quota exceeded: ${apiKey}`);
          getNextApiKey();
        } else {
          throw error;
        }
      }
    }

    if (!success) {
      throw new Error('All API keys have exceeded their quota.');
    }

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