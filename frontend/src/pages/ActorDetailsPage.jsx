import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ActorDetailsPage.css';

const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      return (
        <ul className="custom-list">
          {value.map((item, idx) => (
            <li key={idx}>{formatValue(item)}</li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul className="custom-sublist">
          {Object.entries(value).map(([key, val]) => (
            <li key={key}>
              <span className="actor-key-sub">{key}</span>: {formatValue(val)}
            </li>
          ))}
        </ul>
      );
    }
  }
  return <span className="actor-value">{String(value)}</span>;
};

const ActorDetailPage = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState({});

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/actor/actor/${actorId}`, {
          withCredentials: true,
        });
        setActor(res.data.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch actor details.');
      }
    };

    fetchActor();
  }, [actorId]);

  const toggleKey = (key) => {
    setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="accordion-container">
      <h2 className="accordion-header">Actor Details</h2>
      {actor ? (
        <div className="accordion">
          {Object.entries(actor).map(([key, value]) => (
            <div key={key} className="accordion-item">
              <div className="accordion-title" onClick={() => toggleKey(key)}>
                <span className="accordion-arrow">{expandedKeys[key] ? '▲' : '▼'}</span>
                <span className="accordion-key">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
              </div>
              {expandedKeys[key] && (
                <div className="accordion-content">
                  {formatValue(value)}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading actor details...</p>
      )}
    </div>
  );
};

export default ActorDetailPage;
