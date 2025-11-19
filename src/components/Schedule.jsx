import React from 'react';
import MatchCard from './MatchCard';

const Schedule = ({ data }) => {
    return (
        <div className="schedule-container">
            <header className="view-header">
                <h1>Schedule</h1>
                <p className="text-secondary">All upcoming and past matches</p>
            </header>

            <div className="matches-grid">
                {data.map((match) => (
                    <MatchCard key={match.id} match={match} />
                ))}
            </div>

            <style>{`
        .view-header {
          margin-bottom: 2rem;
        }

        .matches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
      `}</style>
        </div>
    );
};

export default Schedule;
