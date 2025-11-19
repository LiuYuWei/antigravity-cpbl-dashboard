import React from 'react';
import MatchCard from './MatchCard';
import { Activity, Users, Calendar as CalendarIcon } from 'lucide-react';

const Dashboard = ({ data }) => {
    const upcomingMatches = data.filter(m => m.status === 'Upcoming');
    const finishedMatches = data.filter(m => m.status === 'Finished');

    const nextMatch = upcomingMatches.length > 0 ? upcomingMatches[0] : null;
    const recentMatch = finishedMatches.length > 0 ? finishedMatches[finishedMatches.length - 1] : null;

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div className="glass-panel stat-card">
            <div className="stat-icon" style={{ background: `rgba(${color}, 0.1)`, color: `rgb(${color})` }}>
                <Icon size={24} />
            </div>
            <div className="stat-info">
                <span className="stat-value">{value}</span>
                <span className="stat-label">{label}</span>
            </div>
        </div >
    );

    return (
        <div className="dashboard-container">
            <header className="view-header">
                <h1>Dashboard</h1>
                <p className="text-secondary">Overview of the 2025 Winter League</p>
            </header>

            <div className="stats-grid">
                <StatCard
                    icon={CalendarIcon}
                    label="Total Matches"
                    value={data.length}
                    color="56, 189, 248" // Sky Blue
                />
                <StatCard
                    icon={Activity}
                    label="Matches Played"
                    value={finishedMatches.length}
                    color="244, 114, 182" // Pink
                />
                <StatCard
                    icon={Users}
                    label="Teams"
                    value={new Set(data.map(d => d.team1)).size}
                    color="168, 85, 247" // Purple
                />
            </div>

            <div className="dashboard-sections">
                <section className="dashboard-section">
                    <h2>Next Match</h2>
                    {nextMatch ? (
                        <MatchCard match={nextMatch} />
                    ) : (
                        <div className="glass-panel empty-state">No upcoming matches</div>
                    )}
                </section>

                <section className="dashboard-section">
                    <h2>Latest Result</h2>
                    {recentMatch ? (
                        <MatchCard match={recentMatch} />
                    ) : (
                        <div className="glass-panel empty-state">No matches played yet</div>
                    )}
                </section>
            </div>

            <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .dashboard-sections {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .dashboard-section h2 {
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }

        .empty-state {
          padding: 2rem;
          text-align: center;
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
