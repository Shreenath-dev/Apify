import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TokenPage from './pages/TokenPage';
import ActorListPage from './pages/ActorListPage';
import ActorDetailPage from './pages/ActorDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TokenPage />} />
        <Route path="/actors" element={<ActorListPage />} />
        <Route path="/actor/:actorId" element={<ActorDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
