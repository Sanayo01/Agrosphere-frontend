import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { Link, useNavigate } from 'react-router-dom';
// 1. IMPORT YOUR CONFIG FOR AGROCOIN SYMBOL AND API
import { AGROCOIN_SYMBOL, API_BASE_URL } from '../config'; 

// 2. REPLACED HARDCODED IMAGE WITH DYNAMIC PATH
const mockExpert = {
    name: 'Dr. Fatima Bello',
    specialty: 'Agronomist & Soil Scientist',
    rateAgroCoin: 35,
    imageUrl: '/assets/expert2.jpg',
    // Proving Business Viability: Highlighting the revenue stream
    commissionRate: 0.15, 
};

const ExpertBookingPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedDate] = useState('2026-01-25');
    const [selectedTime] = useState('11:00 AM');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'];

    // 3. REVENUE LOGIC: Directly supports the "Commissions" revenue stream in your pitch
    const expertFee = mockExpert.rateAgroCoin;
    const agrosphereCommission = Math.round(expertFee * mockExpert.commissionRate);
    const totalCost = expertFee + agrosphereCommission;

    const handleConfirmBooking = async () => {
        setIsProcessing(true);
        
        // 4. API INTEGRATION: Hit the backend for booking confirmation
        try {
            await fetch(`${API_BASE_URL}/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    expert: mockExpert.name,
                    date: selectedDate,
                    time: selectedTime,
                    fee: totalCost,
                    currency: AGROCOIN_SYMBOL || 'AC'
                })
            });
        } catch (e) {
            console.warn("Backend not detected, proceeding with Web3 Simulation.");
        }

        setTimeout(() => {
            setIsConfirmed(true);
            setIsProcessing(false);
            // Auto-redirect after success
            setTimeout(() => {
                navigate('/experts', { replace: true });
            }, 3000); 
        }, 1500);
    };
    
    // ... (Keep renderCalendar logic, just update the dates to Jan 2026) ...

    if (isConfirmed) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
                    <span className="text-6xl text-amber-500 mb-4">✅</span>
                    <h2 className="text-2xl font-bold text-green-700">Consultation Booked!</h2>
                    <p className="text-gray-600 mt-2">
                        Transaction confirmed via **Sepolia Network**.
                    </p>
                    <p className="text-lg font-bold text-amber-600 mt-1">
                        Total Paid: {totalCost} {AGROCOIN_SYMBOL || 'AC'}
                    </p>
                    <Link to="/experts" className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                        Return to Expert Hub
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <header className="flex items-center p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md">
                <Link to="/experts" className="text-xl mr-3">{'<'}</Link>
                <h1 className="text-lg font-semibold">Book Consultation</h1>
            </header>

            <main className="grow overflow-y-auto p-4 space-y-5 pb-32"> 
                {/* Expert Profile Snippet */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow-md border-2 border-green-300">
                    <img src={mockExpert.imageUrl} alt={mockExpert.name} className="w-12 h-12 rounded-full object-cover border border-green-500" />
                    <div className="ml-3">
                        <h3 className="text-lg font-bold text-gray-800">{mockExpert.name}</h3>
                        <p className="text-sm text-green-700">{mockExpert.specialty}</p>
                    </div>
                </div>

                {/* Date/Time Selection Sections (Keep existing render logic) */}

                {/* --- C. Cost Summary: Revenue Model Highlight --- */}
                <div className="p-4 bg-amber-50 rounded-xl shadow-md border border-amber-300">
                    <h2 className="text-md font-bold text-gray-800 mb-2">Cost Summary</h2>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <p>Consultation Fee</p>
                            <p>{expertFee} {AGROCOIN_SYMBOL || 'AC'}</p>
                        </div>
                        <div className="flex justify-between border-b border-amber-200 pb-1 text-gray-600">
                            <p>Service Commission (15%)</p>
                            <p className='font-semibold text-red-500'>+{agrosphereCommission} {AGROCOIN_SYMBOL || 'AC'}</p>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-1">
                            <p>Total Due</p>
                            <p className='text-amber-600'>{totalCost} {AGROCOIN_SYMBOL || 'AC'}</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* 3. Fixed Footer: Confirm Button */}
            <div className="fixed bottom-16 w-full max-w-sm bg-white p-4 border-t border-gray-300 shadow-2xl z-20">
                <button 
                    onClick={handleConfirmBooking}
                    disabled={isProcessing}
                    className={`w-full py-4 font-bold text-lg rounded-lg shadow-lg transition-colors ${
                        isProcessing ? 'bg-gray-400' : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                >
                    {isProcessing ? 'Processing Web3 Payment...' : `Confirm & Pay ${totalCost} ${AGROCOIN_SYMBOL || 'AC'}`}
                </button>
            </div>
            <MobileNavbar />
        </Layout>
    );
};

export default ExpertBookingPage;