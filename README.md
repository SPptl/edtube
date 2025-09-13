# EdTube - Educational Video Platform

EdTube is a smart learning platform that provides educational videos and playlists from YouTube, with personalized recommendations and watch history tracking.

## Features

- 🔐 Google OAuth2 Authentication
- 🔍 Search educational videos and playlists (70% videos, 30% playlists)
- 📚 Watch history tracking
- 🎯 Personalized recommendations
- 📱 Responsive design
- 🎥 YouTube embedded player

## Tech Stack

### Backend
- Spring Boot 3.5.5
- Spring Security with OAuth2
- Spring Data JPA
- MySQL Database
- YouTube Data API v3

### Frontend
- React 18
- React Router
- Axios for API calls
- CSS3 with responsive design

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- YouTube Data API v3 key
- Google OAuth2 credentials

## Setup Instructions

### 1. Database Setup

1. Install MySQL and create a database:
```sql
CREATE DATABASE edtube_db;
```

2. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. API Keys Setup

1. Get YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com/)
2. Get Google OAuth2 credentials from [Google Cloud Console](https://console.cloud.google.com/)

3. Set environment variables or update `application.properties`:
```bash
export GOOGLE_CLIENT_ID=your_google_client_id
export GOOGLE_CLIENT_SECRET=your_google_client_secret
export YOUTUBE_API_KEY=your_youtube_api_key
```

### 3. Backend Setup

1. Navigate to the project root directory
2. Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

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

## API Endpoints

### Authentication
- `GET /oauth2/authorization/google` - Google OAuth2 login
- `GET /api/user/profile` - Get user profile
- `GET /api/user/check` - Check authentication status

### YouTube Integration
- `GET /api/youtube/search?query={query}` - Search educational content
- `GET /api/youtube/video/{videoId}` - Get video details
- `GET /api/youtube/playlist/{playlistId}/videos` - Get playlist videos

### Watch History
- `GET /api/history/recent?limit={limit}` - Get recent watch history
- `POST /api/history/add` - Add video to watch history

### Recommendations
- `GET /api/recommendations/videos?limit={limit}` - Get personalized recommendations

## Usage

1. Open `http://localhost:3000` in your browser
2. Click "Continue with Google" to authenticate
3. Search for educational content using the search bar
4. Click on videos to watch them
5. Your watch history will be automatically tracked
6. Get personalized recommendations based on your viewing history

## Project Structure

```
edtube/
├── src/main/java/com/edtube/backend/
│   ├── config/          # Security and OAuth2 configuration
│   ├── controller/      # REST controllers
│   ├── dto/            # Data Transfer Objects
│   ├── entity/         # JPA entities
│   ├── handler/        # OAuth2 success handler
│   ├── repository/     # JPA repositories
│   └── service/        # Business logic services
├── src/main/resources/
│   └── application.properties
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/ # React components
│   │   └── App.js
│   └── package.json
└── pom.xml
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
