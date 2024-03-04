// components/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import defaultProfileImage from '../assets/images/profile/user-1.jpg';

export const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/user/${userId}`);
        const userData = await response.json();

        if (response.ok) {
          setUser(userData.user);
        } else {
          console.error('Error fetching user:', userData.error);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.name}'s Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Other user details */}
          {user.profilePhoto ? (
            <img src={user.profilePhoto} alt={`${user.name}'s Profile`} />
          ) : (
            <img src={defaultProfileImage} alt="Default Profile" />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;