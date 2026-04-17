import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useToast, useAuth } from '../../context';

const LandingProductCard = ({ product, index = 0, onLoginRequired }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const { addToCart } = useCart();
  const { success } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const supermarketName = product.supermarketId?.name || 'Unknown Store';

  const handleOrder = (e) => {
    e.stopPropagation();
    if (product.stock === 0 || isOrdering) return;

    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }

    setIsOrdering(true);
    addToCart(product);
    success(`${product.name} added to cart!`);
    navigate('/cart');

    setTimeout(() => setIsOrdering(false), 600);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Drinks': 'from-blue-500 to-blue-600',
      'Foods': 'from-orange-500 to-orange-600',
      'Hygiene': 'from-green-500 to-green-600',
      'Vegetables': 'from-emerald-500 to-emerald-600',
      'Other': 'from-gray-500 to-gray-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 group hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop';
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${getCategoryColor(product.category)} shadow-lg`}>
            {product.category}
          </span>
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 right-3 animate-pulse">
            <span className="px-3 py-1 text-xs font-semibold text-yellow-900 bg-yellow-400 rounded-full shadow-lg">
              Only {product.stock} left!
            </span>
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <span className="px-4 py-2 text-white font-bold bg-red-600 rounded-lg shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <p className="text-sm text-gray-500 font-medium">{supermarketName}</p>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Price</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              RWF {product.price.toLocaleString()}
            </span>
          </div>
          
          <button
            onClick={handleOrder}
            disabled={product.stock === 0 || isOrdering}
            className={`
              px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden
              ${product.stock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg active:scale-95 hover:scale-105'
              }
              ${isOrdering ? 'scale-95' : ''}
            `}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Order
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingProductCard;
