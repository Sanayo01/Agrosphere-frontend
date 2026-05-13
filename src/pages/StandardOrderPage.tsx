import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
// 1. IMPORT YOUR CONFIG
import { AGROCOIN_SYMBOL } from '../config';

const StandardOrderPage: React.FC = () => {
  const { clearCart, transaction } = useCart();
  // const navigate = useNavigate(); // Available for future routing needs
  
  useEffect(() => {
    // Clear the cart state immediately upon loading this page
    if (transaction) {
      clearCart();
    }
  }, [clearCart, transaction]);

  if (!transaction) {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen text-center p-6">
                <span className="text-4xl mb-4">⚠️</span>
                <h1 className="text-xl font-bold text-gray-800">Order details missing.</h1>
                <Link to="/" className="mt-4 text-green-600 font-semibold">Return Home</Link>
            </div>
            <MobileNavbar />
        </Layout>
    );
  }

  return (
    <Layout>
      <header className="p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md">
        <h1 className="text-lg font-semibold text-center">Order Confirmed!</h1>
      </header>

      <main className="grow overflow-y-auto p-6 space-y-6 text-center pb-32">
        
        <div className="flex flex-col items-center justify-center">
            <span className="text-6xl text-green-500 animate-pulse">✅</span>
            <h2 className="text-3xl font-extrabold text-green-700 mt-2">Success!</h2>
            <p className="text-gray-600 mt-1">Your standard order is being processed.</p>
        </div>
        
        {/* Order Details Card */}
        <div className="p-4 bg-green-50 rounded-xl shadow-lg border border-green-300 space-y-1">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Amount Paid</p>
            <p className="text-4xl font-extrabold text-green-800">₦{transaction.totalNaira.toLocaleString()}</p>
            {/* Show AC equivalent for consistency even in standard orders */}
            <p className="text-sm font-semibold text-amber-600">
                Processed via {AGROCOIN_SYMBOL || 'AC'} Gateway
            </p>
        </div>

        {/* --- STANDARD ORDER BLOCK --- */}
        <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 text-left space-y-2">
            <h3 className="text-md font-bold text-gray-800 flex items-center space-x-2">
                <span>📦</span> <span>Logistics Tracking</span>
            </h3>
            <p className="text-xs text-gray-600">This order uses Agrosphere standard delivery. Note: Standard items do not include end-to-end blockchain farm traceability.</p>
            
            <div className="font-mono text-[10px] p-2 bg-gray-50 rounded border border-gray-200 break-all mt-2 text-gray-500">
                TRACKING-ID: AGRO-STD-{Date.now().toString().slice(-6)}-{Math.random().toString(36).substring(2, 6).toUpperCase()}
            </div>
        </div>

        {/* Delivery Timeline */}
        <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 text-left">
            <h3 className="text-md font-bold text-gray-800 mb-1">Estimated Delivery</h3>
            <p className="text-gray-600 text-sm">Tomorrow, between 10 AM - 1 PM.</p>
            <Link to="/" className="mt-2 block text-sm font-medium text-blue-600 hover:underline">
                View Estimated Route
            </Link>
        </div>

      </main>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 w-full max-w-sm bg-white p-4 border-t border-gray-300 shadow-2xl z-20">
        <Link to="/" className="w-full block text-center py-4 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors">
          Return to Dashboard
        </Link>
      </div>

      <MobileNavbar />
    </Layout>
  );
};

export default StandardOrderPage;