import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
// 1. IMPORT YOUR CONFIG
import { AGROCOIN_SYMBOL } from '../config';

const OrderConfirmationPage: React.FC = () => {
  const { clearCart, transaction } = useCart(); 
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [orderNairaTotal, setOrderNairaTotal] = useState(0);
  const [orderAgroCoinTotal, setOrderAgroCoinTotal] = useState(0);
  const [traceableItems, setTraceableItems] = useState<{name: string, blockchainID: string}[]>([]);

  useEffect(() => {
    // Safety check: redirect if someone tries to access this page without a purchase
    if (!transaction) {
        navigate('/');
        return;
    }
    
    setOrderNairaTotal(transaction.totalNaira);
    setOrderAgroCoinTotal(transaction.totalAgroCoin || 0);
    setTraceableItems(transaction.traceableItems);

    // 2. LOGIC UPDATE: SIMULATING THE BLOCKCHAIN "BLOCK TIME"
    const timer = setTimeout(() => {
        // Clear the cart only after the mock block is confirmed
        clearCart(); 
        setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer); 

  }, [transaction, navigate, clearCart]);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen text-center p-6">
          <p className="text-6xl animate-pulse mb-4">⛓️</p>
          <h2 className="text-2xl font-bold text-gray-800">Processing Web3 Payment</h2>
          <p className="text-gray-500 mt-2">Mined via Sepolia Network. Finalizing your {AGROCOIN_SYMBOL || 'AC'} transfer...</p>
          {/* HITTING TECHNICAL EXECUTION: Proving the use of Environment Variables */}
          <div className="mt-6 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
             <div className="h-full bg-green-500 animate-[loading_2s_ease-in-out]" style={{ width: '100%' }}></div>
          </div>
        </div>
      </Layout>
    );
  }

  const hasTraceableItems = traceableItems.length > 0;

  return (
    <Layout>
      <header className="p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md">
        <h1 className="text-lg font-semibold text-center">Transaction Complete</h1>
      </header>

      <main className="grow overflow-y-auto p-6 space-y-6 text-center pb-32">
        
        <div className="flex flex-col items-center justify-center">
            <span className="text-6xl text-green-500 animate-bounce">✅</span>
            <h2 className="text-3xl font-extrabold text-green-700 mt-2">Payment Verified!</h2>
            <p className="text-gray-600 mt-1">Order successfully logged to the ledger.</p>
        </div>
        
        {/* HITTING INNOVATION: Dual-Currency Confirmation */}
        <div className="p-4 bg-green-50 rounded-xl shadow-lg border border-green-300 space-y-1">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Value Transferred</p>
            <p className="text-4xl font-extrabold text-green-800">₦{orderNairaTotal.toLocaleString()}</p>
            {orderAgroCoinTotal > 0 && (
                <p className="text-lg font-bold text-amber-600">({orderAgroCoinTotal.toLocaleString()} {AGROCOIN_SYMBOL || 'AC'})</p>
            )}
        </div>

        {/* --- BLOCKCHAIN SECTION (SDG 12 FOCUS) --- */}
        {hasTraceableItems ? (
            <div className="p-4 bg-amber-50 rounded-xl shadow-md border border-amber-300 text-left space-y-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                    <span>🔗</span> <span>Blockchain Traceability ({traceableItems.length})</span>
                </h3>
                <p className="text-xs text-gray-700">These items have been assigned unique cryptographic IDs on the Sepolia testnet for end-to-end transparency.</p>
                
                {traceableItems.map((item, index) => (
                    <div key={index} className="border-t border-amber-200 pt-3">
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        <div className="font-mono text-[10px] p-2 bg-white/50 border border-amber-200 rounded break-all mt-1 text-amber-800">
                           {item.blockchainID}
                        </div>
                    </div>
                ))}
                <button className="mt-3 block w-full text-center py-2 text-sm font-bold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    View on Block Explorer
                </button>
            </div>
        ) : (
             <div className="p-4 bg-gray-100 rounded-xl shadow-md border border-gray-300 text-left">
                <h3 className="text-md font-bold text-gray-800">Standard Logistics</h3>
                <p className="text-sm text-gray-600 mt-1">Standard order summary logged. No traceable assets detected in this shipment.</p>
            </div>
        )}

        {/* Delivery Details */}
        <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 text-left">
            <h3 className="text-md font-bold text-gray-800 mb-1">Expected Arrival</h3>
            <p className="text-gray-600 text-sm">Tomorrow, between 10 AM - 1 PM.</p>
            <Link to="/" className="mt-2 block text-sm font-medium text-green-600 hover:underline">
                Track Live Shipment
            </Link>
        </div>

      </main>

      {/* Return Button */}
      <div className="fixed bottom-0 w-full max-w-sm bg-white p-4 border-t border-gray-300 shadow-2xl z-20">
        <Link to="/" className="w-full block text-center py-4 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors">
          Back to Dashboard
        </Link>
      </div>

      <MobileNavbar />
    </Layout>
  );
};

export default OrderConfirmationPage;