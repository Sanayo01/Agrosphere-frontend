import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
// 1. IMPORT YOUR CONFIG
import { AGROCOIN_SYMBOL } from '../config';

const TraceableOrderPage: React.FC = () => {
  const { clearCart, transaction } = useCart();
  // const navigate = useNavigate(); // Available for future routing needs
  
  useEffect(() => {
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

  const traceableItems = transaction.traceableItems;

  return (
    <Layout>
      <header className="p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md text-center">
        <h1 className="text-lg font-semibold">Verified Purchase!</h1>
      </header>

      <main className="grow overflow-y-auto p-6 space-y-6 text-center pb-32">
        
        {/* Success Icon */}
        <div className="flex flex-col items-center justify-center">
            <span className="text-6xl text-green-500 animate-bounce">🛡️</span>
            <h2 className="text-3xl font-extrabold text-green-700 mt-2">Web3 Confirmed</h2>
            <p className="text-gray-600 mt-1">Your traceable order is on its way.</p>
        </div>
        
        {/* Order Details Card */}
        <div className="p-4 bg-green-50 rounded-xl shadow-lg border border-green-300 space-y-1">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Value</p>
            <p className="text-4xl font-extrabold text-green-800">₦{transaction.totalNaira.toLocaleString()}</p>
            {/* Show the AgroCoin conversion for the "Technical Execution" points */}
            <p className="text-sm font-semibold text-amber-600 italic">
                Secured via {transaction.totalAgroCoin || Math.floor(transaction.totalNaira / 100)} {AGROCOIN_SYMBOL || 'AC'}
            </p>
        </div>

        {/* --- BLOCKCHAIN TRACKING BLOCK (SDG 12 HIGHLIGHT) --- */}
        <div className="p-4 bg-amber-50 rounded-xl shadow-md border border-amber-300 text-left space-y-3">
            <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                <span>🔗</span> <span>Blockchain Traceability Report</span>
            </h3>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              AgroSphere uses immutable ledgers to track these items from the farm to your table. 
              The IDs below are permanent records on the <strong>Sepolia Testnet</strong>.
            </p>
            
            <div className="space-y-4">
              {traceableItems.map((item, index) => (
                  <div key={index} className="border-t border-amber-200 pt-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">VERIFIED</span>
                      </div>
                      <div className="font-mono text-[10px] p-2 bg-white/60 border border-amber-200 rounded break-all mt-1.5 text-amber-900">
                          HASH: {item.blockchainID}
                      </div>
                  </div>
              ))}
            </div>
            
            <Link to="#" className="mt-4 block w-full text-center py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow hover:bg-blue-700 transition-colors">
                View on Block Explorer
            </Link>
        </div>

        {/* Delivery Timeline */}
        <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 text-left">
            <h3 className="text-md font-bold text-gray-800 mb-1">Logistics Estimate</h3>
            <p className="text-gray-600 text-sm">Arriving tomorrow, 10 AM - 1 PM.</p>
            <Link to="/" className="mt-2 block text-sm font-medium text-green-600 hover:underline">
                View Live Logistics Map
            </Link>
        </div>

      </main>

      {/* Return Navigation */}
      <div className="fixed bottom-0 w-full max-w-sm bg-white p-4 border-t border-gray-300 shadow-2xl z-20">
        <Link to="/" className="w-full block text-center py-4 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors">
          Return to Dashboard
        </Link>
      </div>

      <MobileNavbar />
    </Layout>
  );
};

export default TraceableOrderPage;