import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FriendsPage from './pages/FriendsPage';
import PhotosPage from './pages/PhotosPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/photos" element={<PhotosPage />} />
      </Routes>
    </Router>
  );
}

export default App;