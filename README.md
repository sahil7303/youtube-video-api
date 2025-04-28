# Serri Backend Assignment

This project is a backend application that fetches and stores YouTube videos based on a predefined search query. It provides APIs to retrieve the stored videos in a paginated format and search for videos by title or description. The application is built using Node.js, Express.js, and MongoDB, and is containerized using Docker.

## Features
- Fetches the latest YouTube videos periodically using the YouTube Data API v3.
- Stores video data (title, description, publishing datetime, thumbnails, etc.) in MongoDB.
- Provides a paginated API to retrieve stored videos.
- Includes a search API to find videos by title or description.
- Fully Dockerized for easy deployment.

## Prerequisites
- Node.js (if running locally)
- Docker and Docker Compose (if using containers)
- MongoDB (if running locally)
- A valid YouTube Data API v3 key

## Environment Variables
Create a `.env` file in the root directory and add the following variables:
```
MONGO_URI=mongodb://localhost:27017/youtube_videos
YOUTUBE_API_KEY=your_youtube_api_key_here
```

## Instructions to Run the Server

### Option 1: Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start MongoDB:
   ```bash
   mongod
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. The server will run on `http://localhost:3000`.

### Option 2: Run with Docker
1. Build and start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```
2. The server will run on `http://localhost:3000`.

## API Endpoints

### 1. Fetch Paginated Videos
- **URL**: `/videos`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional): Page number (default is 1).
  - `limit` (optional): Number of videos per page (default is 10).
- **Example**:
  ```bash
  curl "http://localhost:3000/videos?page=1&limit=5"
  ```

### 2. Search Videos
- **URL**: `/videos/search`
- **Method**: `GET`
- **Query Parameters**:
  - `query`: Search term for title or description.
- **Example**:
  ```bash
  curl "http://localhost:3000/videos/search?query=official"
  ```

## Testing the API
1. Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the endpoints.
2. Verify the database using a MongoDB client (e.g., MongoDB Compass) to ensure videos are being stored.

## Logs and Debugging
- Check the terminal logs to verify that videos are being fetched and stored periodically.
- Ensure the `.env` file contains valid values for `MONGO_URI` and `YOUTUBE_API_KEY`.

## License
This project is for educational purposes only.