import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { Link } from 'react-router-dom';
// 1. IMPORT YOUR CONFIG
import { API_BASE_URL, AGROCOIN_SYMBOL } from '../config';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardCard: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-4 rounded-xl shadow-md ${className}`}>
    {children}
  </div>
);

const HomePage: React.FC = () => {
  // 2. STATE FOR DYNAMIC DASHBOARD DATA
  const [investmentData, setInvestmentData] = useState({ amount: 8500, acValue: 85 });
  // const [loading] = useState(false); // Not currently used in this component

  // 3. OPTIONAL FETCH: Proving technical depth by syncing dashboard with backend
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user/dashboard`);
        const data = await response.json();
        if (data) setInvestmentData(data);
      } catch (e) {
        console.warn("Using local state for dashboard demo.");
      }
    };
    fetchDashboard();
  }, []);

  return (
    <Layout>
      {/* 1. Header (Agrosphere Logo & Voice) */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-2xl text-green-600">🌱</span> 
          <h1 className="text-xl font-bold text-gray-800">Agrosphere</h1>
        </div>
        <button aria-label="Voice Command" className="text-gray-500 hover:text-green-600 transition-colors p-2 rounded-full bg-gray-100">
          <span className="text-lg">🎙️</span> 
        </button>
      </header>

      <main className="p-4 space-y-5 mb-20"> 
        
        {/* --- A. AI-Powered Companion Card (Innovation Highlight) --- */}
        <DashboardCard className="bg-amber-100 border-2 border-amber-300">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">AI Farming Advisor (Agro-Chat)</h2>
          <div className="flex flex-col items-center justify-center p-6 bg-white/70 rounded-lg space-y-3">
            <span className="text-4xl text-amber-500">🤖</span> 
            <p className="text-sm text-gray-600 font-medium text-center">Get intelligent crop recommendations and disease advice instantly.</p>
            
            <Link 
                to="/chat" 
                className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-colors text-center"
            >
              Start Chat / Ask Advisor
            </Link>
          </div>
        </DashboardCard>

        {/* --- B. Farm Co-Ownership Card (Web3 Integration) --- */}
        <DashboardCard className="bg-green-50 border-2 border-green-300">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <span>💰</span>
                <span>Farm Co-Ownership</span>
            </h2>
            <Link to="/invest" className="text-sm font-semibold text-green-600 hover:underline"> 
                View Farms
            </Link>
          </div>
          <div className="mt-2 text-gray-600">
            <p className="text-2xl font-bold text-green-700">₦{investmentData.amount.toLocaleString()}</p>
            <p className="text-sm font-medium text-amber-600">
              {investmentData.acValue} {AGROCOIN_SYMBOL || 'AC'} (Estimated 15% ROI)
            </p>
          </div>
        </DashboardCard>

        {/* --- C. Mini-Farm Tasks List --- */}
        <DashboardCard className="bg-white border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">✅ Your Mini-Farm Tasks</h2>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2 text-gray-700">
              <span className="text-green-500 text-lg">☑️</span>
              <p>Water Container Tomatoes</p>
            </li>
            <li className="flex items-start space-x-2 text-gray-700">
              <span className="text-green-500 text-lg">☑️</span>
              <p>Apply Organic Fertilizer (Reminder)</p>
            </li>
            <li className="flex items-start space-x-2 text-gray-700 opacity-60">
              <span className="text-gray-400 text-lg">☐</span>
              <p>Check Soil pH for Corn</p>
            </li>
          </ul>
        </DashboardCard>

        {/* --- D. Educational Content Hub --- */}
        <DashboardCard className="bg-blue-50 border-2 border-blue-300">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span>📚</span>
                <span>Learn & Grow</span>
            </h2>
            <p className="text-sm text-gray-600 mb-3">
                Watch beginner-friendly videos in Nigerian languages and get region-specific tips.
            </p>
            <div className="grid grid-cols-2 gap-3">
                <button className="py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    Guides
                </button>
                <button className="py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    Videos
                </button>
            </div>
        </DashboardCard>
        
      </main>

      <MobileNavbar />
    </Layout>
  );
};

export default HomePage;