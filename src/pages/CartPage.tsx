import React from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { AGROCOIN_SYMBOL } from '../config'; 

const CartPage: React.FC = () => {
  const { cart, cartCount } = useCart();
  
  const totalNaira = cart.reduce((sum, item) => sum + item.priceNaira * item.quantity, 0);
  const totalAgroCoin = cart.reduce((sum, item) => sum + item.priceAgroCoin * item.quantity, 0);

  return (
    <Layout>
      {/* ... keep Header as is ... */}

      <main className="p-4 space-y-4 mb-20">
        
        {/* ... keep Empty State as is ... */}

        {/* Cart Items List */}
        {cart.length > 0 && (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm">
                <div className="grow">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700">₦{item.priceNaira * item.quantity}</p>
                  {/* Highlight the AC price to emphasize Web3 integration */}
                  <p className="text-sm font-semibold text-amber-500">
                    {item.priceAgroCoin * item.quantity} {AGROCOIN_SYMBOL || 'AC'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Totals and Checkout Button */}
        {cartCount > 0 && (
          <div className="p-4 bg-green-50 rounded-xl border-2 border-green-300">
             <div className="flex justify-between text-lg font-semibold text-gray-800 mb-1">
              <span>Subtotal:</span>
              <span>₦{totalNaira.toLocaleString()}</span>
            </div>
            
            {/* Blockchain Transparency Note */}
            <div className="flex justify-between text-lg font-bold text-amber-600 mb-2">
              <span>Web3 Total:</span>
              <span>{totalAgroCoin.toLocaleString()} {AGROCOIN_SYMBOL || 'AC'}</span>
            </div>
            
            <p className="text-[10px] text-gray-400 mb-4 italic text-center">
              *Transactions processed via Ethereum/Sepolia for maximum transparency.
            </p>
            
            <Link 
              to="/checkout"
              className="w-full block text-center py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors shadow-lg"
            >
              Confirm and Pay with {AGROCOIN_SYMBOL || 'AC'}
            </Link>
          </div>
        )}

      </main>

      <MobileNavbar />
    </Layout>
  );
};

export default CartPage;