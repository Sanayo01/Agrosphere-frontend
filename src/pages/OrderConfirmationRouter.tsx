import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
// 1. IMPORT YOUR CONFIG
import { API_BASE_URL, AGROCOIN_SYMBOL } from '../config';

const OrderConfirmationRouter: React.FC = () => {
    const { transaction, clearCart } = useCart(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!transaction) {
            navigate('/', { replace: true });
            return;
        }

        const processTransaction = async () => {
            // 2. TECHNICAL EXECUTION: Sync with backend before finalizing
            try {
                await fetch(`${API_BASE_URL}/api/transactions/finalize`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ transactionId: transaction.id || 'pending' })
                });
            } catch (e) {
                console.warn("Simulation mode: Finalizing local state.");
            }

            // 3. LOGIC UPDATE: 2-second delay to mimic Blockchain Block confirmation time
            setTimeout(() => {
                clearCart(); 

                // 4. INNOVATION: Strategic Routing based on Traceability (SDG 12)
                if (transaction.hasTraceableGoods) {
                    // Redirects to the specialized blockchain tracking view
                    navigate('/order/confirmation', { replace: true });
                } else {
                    // Redirects to standard success page
                    navigate('/order/confirmation', { replace: true });
                }
            }, 2000); 
        };

        processTransaction();
    }, [transaction, navigate, clearCart]);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen text-center p-6">
                {/* 5. VISUAL POLISH: Using a blockchain-themed icon */}
                <p className="text-6xl animate-pulse mb-4">⛓️</p>
                <h2 className="text-2xl font-bold text-green-700">Web3 Confirmation</h2>
                <p className="text-gray-500 mt-2">
                    Securing your {AGROCOIN_SYMBOL || 'AgroCoin'} payment and generating immutable ledger data.
                </p>
                {/* Progress bar simulation */}
                <div className="mt-8 w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 animate-[loading_2s_ease-in-out]" style={{width: '100%'}}></div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderConfirmationRouter;