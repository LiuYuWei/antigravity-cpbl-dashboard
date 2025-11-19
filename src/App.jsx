import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Timeline from './components/Timeline';
import Standings from './components/Standings';
import { useCPBLData } from './hooks/useCPBLData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { data, loading, error } = useCPBLData();

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh' }}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-center" style={{ height: '100vh', color: '#ef4444' }}>
        Error loading data: {error.message}
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard data={data} />;
      case 'schedule':
        return <Schedule data={data} />;
      case 'timeline':
        return <Timeline data={data} />;
      case 'standings':
        return <Standings data={data} />;
      default:
        return <Dashboard data={data} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
