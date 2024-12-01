import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
import AuthPage from './components/AuthPage'; // The login/signup page
import ProfilePage from './components/ProfilePage';
import BrowseSkillsPage from './components/BrowseSkillsPage';
import MessagesPage from "./components/MessagesPage";
import HistoryPage from "./components/HistoryPage";
import ForgotPassword from './components/ForgotPassword'; // Forgot password page component
import ResetPasswordPage from './components/ResetPasswordPage'; // Import the ResetPasswordPage component
import SetUpSession from './components/SetUpSession';
import RateSession from './components/RateSession';


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
        <Route path="/" element={<ProfilePage />} /> {/* Home or Profile Page */}
        <Route path="/browse" element={<BrowseSkillsPage />} /> {/* New Route for Browse Skills */}
        <Route path="/forgot-password" element={<ForgotPassword />} />  {/* Forgot Password Page */}
        <Route path="/password-reset/:token" element={<ResetPasswordPage />} />

        <Route path= "/message" element={<MessagesPage />} /> {/*New Route for Messages */}
        <Route path= "/history" element={<HistoryPage />} />
        <Route path="/setup-session" element={<SetUpSession />} />
        <Route path="/rate-session" element={<RateSession />} />


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
