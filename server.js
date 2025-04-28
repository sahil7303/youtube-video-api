import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fetchVideos } from './services/youtubeService.js';
import videoRoutes from './routes/videoRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the YouTube Video API');
});

// Use video routes
app.use('/', videoRoutes);

// Periodic task to fetch videos
setInterval(fetchVideos, 10000); // Fetch videos every 10 seconds

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});