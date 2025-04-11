import React from 'react';
import './DashboardView.css';

const DashboardView = () => {
  return (
    <div className="dash-dashboard-container">
      <h2>Admin Dashboard Overview</h2>
      <p>This is your admin overview with stats, reports, and quick actions.</p>

      {/* Example future card section */}
      <div className="dash-dashboard-card">
        <h4>Quick Stats</h4>
        <p>Appointments today: 8</p>
        <p>New registrations: 3</p>
      </div>
    </div>
  );
};

export default DashboardView;
