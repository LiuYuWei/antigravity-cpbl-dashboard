import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export const useCPBLData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/CPBL_winter_league_2025.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);

        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const processedData = results.data.map(item => ({
              ...item,
              id: item.game_no,
              date: item.date || 'TBD', // Handle missing dates
              score1: item.score1 ? parseInt(item.score1, 10) : null,
              score2: item.score2 ? parseInt(item.score2, 10) : null,
              status: item.score1 && item.score2 ? 'Finished' : 'Upcoming'
            }));
            setData(processedData);
            setLoading(false);
          },
          error: (err) => {
            setError(err);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
