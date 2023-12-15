// ProfileTab.js

import React, { useState } from 'react';
import './ProfileTab.css';

export default function ProfileTab({ user }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="profile-tab-container">
      <div className="profile-header">
        <div className="profile-info">
          <h2>{user.email}</h2>
          <p>Joined on {user.joinDate?.toDate()?.toLocaleDateString()}</p>
        </div>
        <div className="profile-dropdown">
          <button onClick={toggleDropdown}>Profile</button>
          {showDropdown && (
            <div className="dropdown-content">
              <p>Full name: Andromel Ramirez{user.fullName}</p>
              <p>Age: 18 {user.age}</p>
              <p>Sex: Pwede naman{user.sex}</p>
              <p>Bio: Giakpoy nako huhuhu{user.bio}</p>
              <p>Account created on: December 10, 2023{user.accountCreationDate?.toDate()?.toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
