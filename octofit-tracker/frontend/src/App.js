import { NavLink, Route, Routes, Navigate } from 'react-router';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const logoSrc = `${process.env.PUBLIC_URL}/octofitapp-small.svg`;

const navLinkClass = ({ isActive }) =>
  `nav-link ${isActive ? 'active fw-semibold' : ''}`;

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark octo-navbar shadow-sm">
        <div className="container-fluid px-3 px-lg-4 d-flex flex-wrap align-items-center">
          <NavLink
            className="navbar-brand octo-brand me-auto py-0"
            to="/activities"
            aria-label="Octofit Tracker"
          >
            <img src={logoSrc} alt="" className="octo-brand-logo" width={160} height={44} />
            <span className="octo-brand-text d-none d-sm-inline">Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/activities" end>
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/leaderboard" end>
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/teams" end>
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/users" end>
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/workouts" end>
                  Workouts
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4 flex-grow-1 px-3 px-lg-4">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      <footer className="octo-footer mt-auto py-3">
        <div className="container px-3 px-lg-4">
          <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 small text-muted">
            <span className="text-body-secondary">Fitness data from Django REST Framework</span>
            <ul className="nav mb-0 justify-content-sm-end">
              <li className="nav-item">
                <a className="nav-link link-secondary py-0" href="https://react.dev" target="_blank" rel="noopener noreferrer">
                  React
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-secondary py-0" href="https://getbootstrap.com" target="_blank" rel="noopener noreferrer">
                  Bootstrap
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
