import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import ProductCard from '../components/ProductCard';
import TraceabilityModal from '../components/TraceabilityModal';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
// 1. IMPORT YOUR CONFIG
import { API_BASE_URL } from '../config';

const MarketplacePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); 
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { cartCount, addItemToCart } = useCart();

  // --- 2. DYNAMIC TRACEABILITY FALLBACK ---
  // This ensures your demo works even without a database
  const fallbackProducts = [
    { 
      id: 1, name: 'Organic Tomatoes', weight: '1kg', priceN: 800, priceAC: 8, imageUrl: '/assets/tomatoes.jpg', isTraceable: true,
      traceData: { 
        blockchainID: '0x1A2B3C-SEP-2026', 
        impactScore: 'A+',
        production: [
            { label: 'Farm', value: 'Agrosphere Co-op Farm 007' },
            { label: 'Harvest Date', value: '2026-01-05' },
            { label: 'Expert Consulted', value: 'Yes (Agronomist Ada)' },
        ],
        logistics: [
            { label: 'Departure', value: '2026-01-09, 08:00 AM' },
            { label: 'Logistics Partner', value: 'Agrosphere Delivery' },
            { label: 'Temp (Transit)', value: '18°C' },
        ],
      }
    },
    { id: 2, name: 'Fresh Pepper Mix', weight: '1kg', priceN: 800, priceAC: 8, imageUrl: '/assets/pepper.jpg', isTraceable: false },
    { id: 3, name: 'Sweet Potatoes', weight: 'Bumper Bag', priceN: 1200, priceAC: 12, imageUrl: '/assets/potatoes.jpg', isTraceable: true },
    { id: 4, name: 'Heirloom Tomato Seeds', weight: 'Starter Kit', priceN: 500, priceAC: 5, imageUrl: '/assets/seeds.jpg', isTraceable: false },
  ];

  // 3. FETCH DYNAMIC PRODUCTS
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data.length > 0 ? data : fallbackProducts);
      } catch (e) {
        console.warn("Using local traceability data for demo.");
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleTraceClick = (product: any) => {
    setSelectedProduct(product.traceData);
    setIsModalOpen(true);
  };
  
  return (
    <Layout>
      <header className="flex items-center justify-between p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold">Agrosphere Marketplace</h1>
        
        <Link to="/cart" className="relative p-2 hover:bg-green-700 rounded-full transition-colors">
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-green-600">
                    {cartCount}
                </span>
            )}
        </Link>
      </header>

      {/* Category Tabs */}
      <div className="flex justify-around p-2 bg-white sticky top-[68px] z-5 border-b border-gray-200 overflow-x-auto">
        <button className="py-2 px-4 text-sm font-semibold text-green-700 border-b-2 border-green-700 shrink-0">
          Fresh Produce
        </button>
        <button className="py-2 px-4 text-sm text-gray-500 hover:text-green-600 shrink-0">
          Seeds & Tools
        </button>
        <button className="py-2 px-4 text-sm text-gray-500 hover:text-green-600 shrink-0">
          Consultations
        </button>
      </div>

      <main className="p-4 grid grid-cols-2 gap-4 mb-24">
        {loading ? (
            <div className="col-span-2 text-center py-20 text-gray-400 animate-pulse">
                Syncing Traceability Nodes...
            </div>
        ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                weight={product.weight}
                imageUrl={product.imageUrl}
                isTraceable={product.isTraceable}
                onTraceClick={() => handleTraceClick(product)}
                onAddToCart={() => addItemToCart(product)}
              />
            ))
        )}
      </main>

      {selectedProduct && (
        <TraceabilityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productName={products.find(p => p.traceData === selectedProduct)?.name || 'Product'}
          blockchainID={selectedProduct.blockchainID}
          impactScore={selectedProduct.impactScore}
          productionDetails={selectedProduct.production}
          logisticsDetails={selectedProduct.logistics}
        />
      )}

      <MobileNavbar />
    </Layout>
  );
};

export default MarketplacePage;