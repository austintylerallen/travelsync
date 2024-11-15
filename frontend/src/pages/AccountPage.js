// src/pages/AccountPage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

function AccountPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Account Details</h1>
      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <p>Please log in to see account details.</p>
      )}
    </div>
  );
}

export default AccountPage;
