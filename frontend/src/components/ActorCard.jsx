import React from 'react';

const ActorCard = ({ actor, onSelect }) => {
  return (
    <div
      style={{
        backgroundColor: '#1e1e1e',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1rem',
        boxShadow: '0 0 5px #444',
      }}
    >
      <h3>{actor.name}</h3>
      <p>ID: {actor.id}</p>
      <button onClick={onSelect}>Select Actor</button>
    </div>
  );
};

export default ActorCard;
