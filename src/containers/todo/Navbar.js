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
          src={"https://scontent.fmnl8-1.fna.fbcdn.net/v/t39.30808-6/333312883_917091976306743_4649630726043129304_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGkQqAQLBRRZs4sFgz2HDZRMn3SopJTu54yfdKiklO7nm93QeWezMhPr2YQk-WFYTqKGo31w4PByRE9gHi7gSF1&_nc_ohc=sR9EJ6b69dYAX_ByAKs&_nc_ht=scontent.fmnl8-1.fna&oh=00_AfDmDUMF-CqddpVMWypDK2T1rSQayisINnPHrTq0SkpPIA&oe=657F17B3"}
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
