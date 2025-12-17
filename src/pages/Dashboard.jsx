import React, { useEffect, useState } from "react";
import theme from "../theme";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { currentUser } = useAuth(); // Changed from 'user' to 'currentUser'
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interviewing: 0,
    rejected: 0
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    // Load applications from localStorage and calculate stats
    const loadStats = () => {
      const saved = localStorage.getItem('applications');
      if (saved) {
        const applications = JSON.parse(saved);
        setStats({
          total: applications.length,
          applied: applications.filter(app => app.status === 'Applied').length,
          interviewing: applications.filter(app => app.status === 'Interviewing').length,
          rejected: applications.filter(app => app.status === 'Rejected').length
        });
      }
    };

    loadStats();

    // Listen for storage changes (when applications are added/updated)
    window.addEventListener('storage', loadStats);
    
    // Also listen for custom event from same tab
    window.addEventListener('applicationsUpdated', loadStats);

    return () => {
      window.removeEventListener('storage', loadStats);
      window.removeEventListener('applicationsUpdated', loadStats);
    };
  }, []);

  return (
    <div>
      {/* Header */}
      <h1
        className="text-4xl font-bold mb-3"
        style={{ color: theme.espresso }}
      >
        {getGreeting()}, {currentUser?.displayName || "User"}! ☕
      </h1>

      <p className="text-lg mb-6" style={{ color: theme.mocha }}>
        Here's an overview of your placement journey.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard label="Total" value={stats.total} color={theme.accent.caramel} />
        <StatCard label="Applied" value={stats.applied} color={theme.accent.cinnamon} />
        <StatCard label="Interviewing" value={stats.interviewing} color={theme.latte} />
        <StatCard label="Rejected" value={stats.rejected} color={theme.mocha} />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div
    className="p-6 rounded-xl shadow-lg"
    style={{
      background: `linear-gradient(135deg, white, ${theme.milk})`,
      border: `1px solid ${theme.cream}`,
    }}
  >
    <h3 className="text-lg font-semibold" style={{ color: theme.mocha }}>
      {label}
    </h3>
    <p className="text-3xl font-bold" style={{ color }}>
      {value}
    </p>
  </div>
);

export default Dashboard;