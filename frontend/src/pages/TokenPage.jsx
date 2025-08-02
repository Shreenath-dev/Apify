import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TokenPage = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/auth/user/api-token',
        { apiToken: token },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      navigate('/actors');
    } catch (error) {
      console.error(error);
      alert('Token submission failed.');
    }
  };

  return (
    <div className="page-center">
      <div className="container">
        <h2>Enter API Token</h2>
        <input
          type="text"
          placeholder="Paste your API token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default TokenPage;
