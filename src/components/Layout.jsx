import React from 'react';
import { LayoutGrid, Calendar, Trophy, MapPin } from 'lucide-react';

const Layout = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'timeline', icon: MapPin, label: 'Timeline' },
    { id: 'standings', icon: Trophy, label: 'Standings' },
  ];

  return (
    <div className="app-container">
      <nav className="sidebar glass-panel">
        <div className="logo">
          <h2>CPBL <span className="text-accent">2025</span></h2>
          <p className="subtitle">Winter League</p>
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <style>{`
        .app-container {
          display: flex;
          min-height: 100vh;
          padding: 2rem;
          gap: 2rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .sidebar {
          width: 260px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 2rem;
          height: calc(100vh - 4rem);
        }

        .logo {
          margin-bottom: 3rem;
        }

        .subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }

        .nav-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--text-secondary);
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: rgba(56, 189, 248, 0.1);
          color: var(--accent-primary);
          border: 1px solid rgba(56, 189, 248, 0.2);
        }

        .main-content {
          flex: 1;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .app-container {
            flex-direction: column;
            padding: 1rem;
          }
          
          .sidebar {
            width: 100%;
            height: auto;
            position: static;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
