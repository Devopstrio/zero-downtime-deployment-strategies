import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DeploymentDashboard from './pages/DeploymentDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400 max-w-md mx-auto">The deployment orchestration engine is currently managing multi-environment release cycles and monitoring real-time traffic shifting. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DeploymentDashboard />} />
          <Route path="/strategies" element={<Placeholder name="Deployment Strategy Hub" />} />
          <Route path="/traffic" element={<Placeholder name="Advanced Traffic Shifting & Control" />} />
          <Route path="/health" element={<Placeholder name="Real-time Health & SLA Monitoring" />} />
          <Route path="/rollback" element={<Placeholder name="Automated Rollback & Recovery" />} />
          <Route path="/logs" element={<Placeholder name="Immutable Release & Audit Logs" />} />
          <Route path="/governance" element={<Placeholder name="Deployment Policy & Approval Center" />} />
          <Route path="/metrics" element={<Placeholder name="Global SRE & Reliability Metrics" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
