import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TokenPage = () => {
  const [token, setToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!token.trim()) {
      setErrorMsg('API token cannot be empty');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/auth/user/api-token',
        { apiToken: token },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setErrorMsg('');
      navigate('/actors');
    } catch (error) {
      console.error(error);
      setErrorMsg('Token submission failed. Please check your token.');
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
        {errorMsg && <p style={{ color: 'red', marginTop: '8px' }}>{errorMsg}</p>}
        <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default TokenPage;
