import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ProfileTab from './ProfileTab'; // Import the ProfileTab component
import './Navbar.css'; // Import the Navbar styles

export default function Navbar({ user, logout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const changeProfilePic = (newProfilePic) => {
    setProfilePic(newProfilePic);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="nav-logo">
        <FaStar size={20} />
        <h1>JUST DO NOTHING</h1>
      </div>
      <div className="nav-links">
        <img
          src={profilePic}
          alt="Profile"
          className="profile-pic"
          onClick={() => {
            // Redirect to the profile tab when the profile picture is clicked
            window.location.hash = 'profile';
          }}
        />
       
        <button onClick={logout}>Logout</button>
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      {/* Render the ProfileTab component conditionally based on the route */}
      {window.location.hash === '#profile' && (
        <ProfileTab user={user} changeProfilePic={changeProfilePic} updateNavbarProfilePic={setProfilePic} />
      )}
    </nav>
  );
}
