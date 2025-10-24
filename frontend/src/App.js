import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import VideoPlayer from './pages/VideoPlayer';
import Playlist from './pages/Playlist';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watch/:videoId" element={<VideoPlayer />} />
            <Route path="/playlist/:playlistId" element={<Playlist />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
