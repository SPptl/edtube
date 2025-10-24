# edtube

A modern educational video platform powered by YouTube API, built with Java Spring Boot and React.

## 🎯 Features

- **Educational Content Only** - Filters videos by YouTube's Education category
- **Search Videos & Playlists** - Dual search modes with toggle button
- **Playlist Viewer** - Browse playlist videos within the app
- **Modern UI** - Purple gradient theme with glassmorphism effects
- **Video Player** - Embedded YouTube player with video details
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- YouTube Data API v3
- Maven

### Frontend
- React 18
- React Router v6
- Axios
- Modern CSS with Gradients

## 📋 Prerequisites

- Java 17 or higher
- Node.js 16+ and npm
- Maven 3.6+
- YouTube Data API Key

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/edtube.git
cd edtube
```

### 2. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable **YouTube Data API v3**
4. Create credentials (API Key)
5. Copy your API key

### 3. Backend Setup

1. Navigate to backend resources:
   ```bash
   cd backend/src/main/resources
   ```

2. Copy the example properties file:
   ```bash
   cp application.properties.example application.properties
   ```

3. Edit `application.properties` and add your API key:
   ```properties
   youtube.api.key=YOUR_YOUTUBE_API_KEY_HERE
   ```

4. Build and run the backend:
   ```bash
   cd ../../..  # Back to backend folder
   mvn spring-boot:run
   ```

   Backend will start on `http://localhost:8080`

### 4. Frontend Setup

1. Navigate to frontend directory:
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

   Frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
edtube/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/edtube/
│   │       │   ├── config/         # CORS configuration
│   │       │   ├── controller/     # REST controllers
│   │       │   ├── model/          # Data models (VideoItem, PlaylistItem)
│   │       │   ├── service/        # YouTube API service
│   │       │   └── EdTubeApplication.java
│   │       └── resources/
│   │           ├── application.properties.example
│   │           └── application.properties (excluded from git)
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components (Navbar, VideoCard, PlaylistCard)
│   │   ├── pages/          # Page components (Home, Search, VideoPlayer, Playlist)
│   │   ├── services/       # API services
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🎨 UI Features

- **Navbar** - Search bar with video/playlist mode toggle
- **Home Page** - Welcome section with popular educational topics
- **Search Results** - Mixed grid showing videos and playlists (3:1 ratio)
- **Playlist Page** - Detailed view with all playlist videos
- **Video Player** - Full-screen embedded player

## 🔌 API Endpoints

### Videos
- `GET /api/videos/search?query={query}&maxResults={count}` - Search educational videos
- `GET /api/videos/trending?maxResults={count}` - Get trending educational videos
- `GET /api/videos/{videoId}` - Get video details

### Playlists
- `GET /api/videos/playlists/search?query={query}&maxResults={count}` - Search playlists
- `GET /api/videos/playlists/{playlistId}` - Get playlist details
- `GET /api/videos/playlists/{playlistId}/videos?maxResults={count}` - Get playlist videos

## 🎯 Search Modes

**Video Mode (Default):**
- Shows educational videos with playlists mixed in (3 videos : 1 playlist ratio)

**Playlist Mode:**
- Shows only educational playlists
- Toggle by clicking the button between search input and search button

## 🌈 Design Theme

- **Logo**: "edtube" in lowercase with purple gradient
- **Colors**: Purple gradient (#667eea → #764ba2 → #f093fb)
- **Background**: Dark blue-purple gradients
- **Style**: Modern glassmorphism with backdrop blur effects

## 🔒 Security Notes

- ⚠️ **Never commit `application.properties` with real API keys**
- ✅ The `.gitignore` file already excludes this file
- ✅ Use `application.properties.example` as a template
- 🔄 Rotate API keys immediately if accidentally exposed

## 🐛 Troubleshooting

- **CORS errors**: Ensure backend runs on port 8080 and frontend on port 3000
- **API quota exceeded**: YouTube API has daily quotas. Monitor usage in Google Cloud Console
- **Videos not loading**: Verify API key is correctly set in `application.properties`
- **Backend won't start**: Check that port 8080 is not already in use
- **Frontend build errors**: Try deleting `node_modules` and running `npm install` again

## 📝 License

This project is for educational purposes only.

## 🙏 Acknowledgments

- YouTube Data API v3
- Spring Boot Framework
- React Community
- Educational content creators worldwide
