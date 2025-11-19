import React, { useMemo } from 'react';

const Standings = ({ data }) => {
    const standings = useMemo(() => {
        const teams = {};

        data.forEach(match => {
            if (match.status !== 'Finished') return;

            const { team1, team2, score1, score2 } = match;

            if (!teams[team1]) teams[team1] = { name: team1, wins: 0, losses: 0, ties: 0, points: 0 };
            if (!teams[team2]) teams[team2] = { name: team2, wins: 0, losses: 0, ties: 0, points: 0 };

            if (score1 > score2) {
                teams[team1].wins++;
                teams[team2].losses++;
            } else if (score2 > score1) {
                teams[team2].wins++;
                teams[team1].losses++;
            } else {
                teams[team1].ties++;
                teams[team2].ties++;
            }
        });

        return Object.values(teams).sort((a, b) => {
            // Simple sorting by wins for now, can be more complex
            return b.wins - a.wins || b.ties - a.ties;
        });
    }, [data]);

    return (
        <div className="standings-container">
            <header className="view-header">
                <h1>Standings</h1>
                <p className="text-secondary">Current team rankings</p>
            </header>

            <div className="glass-panel table-container">
                <table className="standings-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team</th>
                            <th>W</th>
                            <th>L</th>
                            <th>T</th>
                            <th>Pct</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((team, index) => {
                            const total = team.wins + team.losses + team.ties;
                            const pct = total > 0 ? ((team.wins + team.ties * 0.5) / total).toFixed(3) : '.000';

                            return (
                                <tr key={team.name}>
                                    <td>{index + 1}</td>
                                    <td className="team-cell">{team.name}</td>
                                    <td>{team.wins}</td>
                                    <td>{team.losses}</td>
                                    <td>{team.ties}</td>
                                    <td>{pct}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <style>{`
        .table-container {
          overflow-x: auto;
          padding: 1rem;
        }

        .standings-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .standings-table th,
        .standings-table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .standings-table th {
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .standings-table tr:last-child td {
          border-bottom: none;
        }

        .standings-table tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }

        .team-cell {
          font-weight: 600;
          color: var(--accent-primary);
        }
      `}</style>
        </div>
    );
};

export default Standings;
