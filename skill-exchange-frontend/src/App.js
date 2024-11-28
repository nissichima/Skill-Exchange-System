import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
import AuthPage from './components/AuthPage'; // The login/signup page
import ProfilePage from './components/ProfilePage';
import BrowseSkillsPage from './components/BrowseSkillsPage';
import MessagesPage from "./components/MessagesPage";
import HistoryPage from "./components/HistoryPage";

function App() {
  const location = useLocation(); // Hook to get the current route

  return (
    <div>
      {/* Conditionally render the global header */}
      {location.pathname !== '/profile' && <Header />}
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/browse" element={<BrowseSkillsPage />} /> {/* New Route for Browse Skills */}
        <Route path= "/message" element={<MessagesPage />} /> {/*New Route for Messages */}
        <Route path= "/history" element={<HistoryPage />} />

      </Routes>
    </div>
  );
}

// Wrap the app with the Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
