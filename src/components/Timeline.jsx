import React, { useMemo } from 'react';
import { Calendar, MapPin } from 'lucide-react';

const Timeline = ({ data }) => {
    const groupedByDate = useMemo(() => {
        const groups = {};
        data.forEach(match => {
            const date = match.date;
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(match);
        });
        return groups;
    }, [data]);

    const dates = Object.keys(groupedByDate).sort();

    return (
        <div className="timeline-container">
            <header className="view-header">
                <h1>Timeline</h1>
                <p className="text-secondary">Chronological view of all matches</p>
            </header>

            <div className="timeline">
                {dates.map((date, index) => (
                    <div key={date} className="timeline-group">
                        <div className="timeline-date-marker">
                            <div className="timeline-dot"></div>
                            <div className="timeline-date-label">
                                <Calendar size={16} />
                                <span>{date}</span>
                            </div>
                        </div>

                        <div className="timeline-matches">
                            {groupedByDate[date].map(match => (
                                <div key={match.id} className="timeline-match glass-panel">
                                    <div className="timeline-match-header">
                                        <span className="match-number">#{match.game_no}</span>
                                        <span className="match-venue">
                                            <MapPin size={12} /> {match.venue}
                                        </span>
                                    </div>

                                    <div className="timeline-teams">
                                        <div className={`timeline-team ${match.status === 'Finished' && match.score1 > match.score2 ? 'winner' : ''}`}>
                                            <span className="team-name">{match.team1}</span>
                                            <span className="team-score">{match.status === 'Finished' ? match.score1 : '-'}</span>
                                        </div>
                                        <span className="vs-divider">VS</span>
                                        <div className={`timeline-team ${match.status === 'Finished' && match.score2 > match.score1 ? 'winner' : ''}`}>
                                            <span className="team-name">{match.team2}</span>
                                            <span className="team-score">{match.status === 'Finished' ? match.score2 : '-'}</span>
                                        </div>
                                    </div>

                                    {match.status === 'Finished' && match.MVP && (
                                        <div className="timeline-mvp">
                                            🏆 MVP: {match.MVP}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .timeline {
          position: relative;
          padding-left: 2rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, 
            var(--accent-primary), 
            var(--accent-secondary),
            var(--accent-primary)
          );
          opacity: 0.3;
        }

        .timeline-group {
          position: relative;
          margin-bottom: 3rem;
        }

        .timeline-date-marker {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .timeline-dot {
          position: absolute;
          left: -2.5rem;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(56, 189, 248, 0.1);
          }
        }

        .timeline-date-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 2rem;
          color: var(--accent-primary);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .timeline-matches {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-left: 1rem;
        }

        .timeline-match {
          padding: 1.25rem;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }

        .timeline-match:hover {
          border-left-color: var(--accent-primary);
          transform: translateX(4px);
        }

        .timeline-match-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .timeline-teams {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .timeline-team {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .timeline-team .team-name {
          font-weight: 600;
        }

        .timeline-team .team-score {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .timeline-team.winner .team-score {
          color: var(--accent-primary);
        }

        .vs-divider {
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .timeline-mvp {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--accent-secondary);
          font-size: 0.875rem;
        }
      `}</style>
        </div>
    );
};

export default Timeline;
