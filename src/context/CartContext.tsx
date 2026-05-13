import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define the shape of a Cart Item (simplified)
interface CartItem {
  id: number;
  name: string;
  priceNaira: number;
  priceAgroCoin: number;
  quantity: number;
}

// Define the shape of the Traceable Item Summary
interface TraceableItemSummary {
    name: string;
    blockchainID: string; 
}

// Define the shape of the Transaction Data - UPDATED
interface TransactionData {
    id?: string;
    totalNaira: number;
    totalAgroCoin?: number;
    hasTraceableGoods: boolean; // <--- NEW FLAG for routing
    traceableItems: TraceableItemSummary[];
}


// Define the shape of the Context Value - UPDATED
interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addItemToCart: (product: any) => void; 
  clearCart: () => void;
  transaction: TransactionData | null;
  setTransaction: (data: TransactionData) => void;
}

// 1. Create the Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. The Cart Provider Component (Manages state and logic)
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [transaction, setTransaction] = useState<TransactionData | null>(null); 

  // Function to reset both cart array and the item count AND transaction data
  const clearCart = () => {
    setCart([]);
    setCartCount(0);
    setTransaction(null); // Clear transaction data as well
  };

  const addItemToCart = (product: any) => {
    // 1. Correctly update the total item count by 1.
    setCartCount(prevCount => prevCount + 1); 
    
    // 2. Find the existing item in the detailed cart list
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      setCart(prevCart => {
        const newCart = [...prevCart];
        
        newCart[existingItemIndex] = {
            ...newCart[existingItemIndex],
            quantity: newCart[existingItemIndex].quantity + 1 
        };
        
        return newCart;
      });
    } else {
      // Item is new, add it to the cart array
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        priceNaira: product.priceN, 
        priceAgroCoin: product.priceAC,
        quantity: 1, 
      };
      setCart(prevCart => [...prevCart, newItem]);
    }
  };

  const contextValue: CartContextType = {
    cart,
    cartCount,
    addItemToCart,
    clearCart, 
    transaction,
    setTransaction, 
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom hook for easy consumption
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};