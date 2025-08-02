import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ActorListPage = () => {
  const [actors, setActors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/actor/actor-list', {
          withCredentials: true,
        });
        setActors(res.data.data.items);
      } catch (error) {
        alert('Failed to fetch actors');
        console.error(error);
      }
    };

    fetchActors();
  }, []);

  const handleSelectActor = (actorId) => {
    navigate(`/actor/${actorId}`);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>🎭 Actor List</h2>
      <div className="flex-grid">
        {actors.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>No actors found.</p>
        ) : (
          actors.map((actor) => (
            <div className="actor-card" key={actor.id}>
              <h3>{actor.name}</h3>
              <p><strong>Username:</strong> {actor.username}</p>
              <button onClick={() => handleSelectActor(actor.id)}>View Details</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActorListPage;
