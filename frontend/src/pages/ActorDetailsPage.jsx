import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside pl-4">
          {value.map((item, idx) => (
            <li key={idx}>{formatValue(item)}</li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul className="list-none pl-4 border-l border-gray-700 ml-2">
          {Object.entries(value).map(([key, val]) => (
            <li key={key} className="mb-1">
              <strong className="text-cyan-300 font-mono capitalize">{key}:</strong> {formatValue(val)}
            </li>
          ))}
        </ul>
      );
    }
  }
  return <span className="text-gray-300 font-light">{String(value)}</span>;
};

const ActorDetailPage = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12 px-6 text-white animate-fade-in">
      <div className="max-w-5xl mx-auto bg-gray-850 shadow-2xl rounded-3xl p-10 border border-gray-700 backdrop-blur-md">
        <h2 className="text-5xl font-extrabold mb-10 text-center text-cyan-400 drop-shadow-lg tracking-wide">
          🎬 Actor Details
        </h2>
        {actor ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(actor).map(([key, value]) => (
              <div
                key={key}
                className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-2xl p-6 border border-gray-700 hover:scale-[1.02] hover:shadow-lg transition-transform duration-200 ease-in-out shadow-inner"
              >
                <strong className="block text-cyan-300 text-sm font-semibold uppercase tracking-wider mb-2">
                  {key.replace(/([a-z])([A-Z])/g, '$1 $2')}:
                </strong>
                <div className="text-md leading-relaxed text-gray-200">
                  {formatValue(value)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg animate-pulse">Loading actor details...</p>
        )}
      </div>
    </div>
  );
};

export default ActorDetailPage;
