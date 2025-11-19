import React from 'react';
import { MapPin, Clock, Award } from 'lucide-react';

const MatchCard = ({ match }) => {
  const isFinished = match.status === 'Finished';

  return (
    <div className="match-card glass-panel">
      <div className="match-header">
        <span className="match-date">{match.date}</span>
        <span className="match-venue">
          <MapPin size={14} /> {match.venue}
        </span>
      </div>

      <div className="teams-container">
        <div className={`team ${isFinished && match.score1 > match.score2 ? 'winner' : ''}`}>
          <span className="team-name">{match.team1}</span>
          <span className="team-score">{isFinished ? match.score1 : '-'}</span>
        </div>
        <div className="vs">VS</div>
        <div className={`team ${isFinished && match.score2 > match.score1 ? 'winner' : ''}`}>
          <span className="team-name">{match.team2}</span>
          <span className="team-score">{isFinished ? match.score2 : '-'}</span>
        </div>
      </div>

      <div className="match-footer">
        {isFinished ? (
          <div className="mvp-badge">
            <Award size={14} /> MVP: {match.MVP}
          </div>
        ) : (
          <div className="time-badge">
            <Clock size={14} /> Upcoming
          </div>
        )}
        <span className="game-no">#{match.game_no}</span>
      </div>

      <style>{`
        .match-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .match-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .match-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .match-card:hover::before {
          transform: scaleX(1);
        }

        .match-header {
          display: flex;
          justify-content: space-between;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .match-venue {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .teams-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0.5rem 0;
        }

        .team {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          transition: transform 0.2s ease;
        }

        .team:hover {
          transform: scale(1.05);
        }

        .team-name {
          font-weight: 600;
          text-align: center;
          font-size: 0.95rem;
        }

        .team-score {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .team.winner .team-name {
          color: var(--accent-primary);
        }

        .team.winner .team-score {
          color: var(--accent-primary);
          text-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(56, 189, 248, 0.8);
          }
        }

        .vs {
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
        }

        .match-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.875rem;
        }

        .mvp-badge, .time-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .mvp-badge {
          color: var(--accent-secondary);
          background: rgba(244, 114, 182, 0.15);
          border: 1px solid rgba(244, 114, 182, 0.3);
        }

        .mvp-badge:hover {
          background: rgba(244, 114, 182, 0.25);
          transform: scale(1.05);
        }

        .time-badge {
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.3);
        }

        .game-no {
          color: var(--text-secondary);
          opacity: 0.5;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
};

export default MatchCard;
