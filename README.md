# EdTube - YouTube Clone Application

A modern, full-stack YouTube clone application built with Spring Boot and React that uses the YouTube Data API to fetch and display videos.

## Features

- 🎥 Browse trending videos
- 🔍 Search for videos
- ▶️ Watch videos with embedded YouTube player
- 📱 Responsive, modern UI design
- 🎨 Dark theme interface
- ⚡ Fast and fluid user experience

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- YouTube Data API v3
- Maven

### Frontend
- React 18
- React Router v6
- Axios
- Modern CSS

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher
- YouTube Data API Key

## Setup Instructions

### 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Copy your API key

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Open `src/main/resources/application.properties` and replace `YOUR_API_KEY_HERE` with your actual YouTube API key:
   ```properties
   youtube.api.key=YOUR_ACTUAL_API_KEY
   ```

3. Build and run the Spring Boot application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Browse trending videos on the home page
3. Use the search bar to find specific videos
4. Click on any video to watch it
5. View related videos on the video player page

## Project Structure

```
edtube/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/edtube/
│   │       │   ├── EdTubeApplication.java
│   │       │   ├── config/
│   │       │   │   └── CorsConfig.java
│   │       │   ├── controller/
│   │       │   │   └── VideoController.java
│   │       │   ├── model/
│   │       │   │   └── VideoItem.java
│   │       │   └── service/
│   │       │       └── YoutubeService.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── VideoCard.js
    │   │   └── VideoGrid.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Search.js
    │   │   └── VideoPlayer.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## API Endpoints

- `GET /api/videos/trending?maxResults=20` - Get trending videos
- `GET /api/videos/search?query=searchTerm&maxResults=20` - Search videos
- `GET /api/videos/{videoId}` - Get video details by ID

## Troubleshooting

- **CORS errors**: Make sure the backend is running on port 8080 and frontend on port 3000
- **API quota exceeded**: YouTube API has daily quota limits. Monitor your usage in Google Cloud Console
- **Videos not loading**: Check that your API key is correctly set in `application.properties`

## License

This project is for educational purposes only.
