import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, useToast } from '../../context';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { success } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const supermarketName = product.supermarketId?.name || 'Unknown Store';

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.stock === 0) return;
    
    setIsAdding(true);
    addToCart(product);
    success(`${product.name} added to cart!`);
    
    setTimeout(() => setIsAdding(false), 600);
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
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 group hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl relative"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product._id}`} className="block">
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
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${getCategoryColor(product.category)} shadow-lg`}>
              {product.category}
            </span>
          </div>

          {/* Stock Badges */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-3 right-3 animate-pulse">
              <span className="px-3 py-1 text-xs font-semibold text-yellow-900 bg-yellow-400 rounded-full shadow-lg">
                Only {product.stock} left!
              </span>
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <span className="px-4 py-2 text-white font-bold bg-red-600 rounded-lg shadow-lg">
                  Out of Stock
                </span>
              </div>
            </div>
          )}

          {/* Quick View Button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button className="px-6 py-3 bg-white/95 backdrop-blur-sm text-gray-900 font-semibold rounded-xl shadow-xl hover:bg-white transition-all duration-200 hover:scale-105 active:scale-95">
              Quick View
            </button>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <Link to={`/products/${product._id}`} className="block">
          <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
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
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
            className={`
              relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 overflow-hidden
              ${product.stock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg active:scale-95 hover:scale-105'
              }
              ${isAdding ? 'scale-95' : ''}
            `}
          >
            <span className={`flex items-center gap-2 transition-all duration-300 ${
              isAdding ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add
            </span>
            {isAdding && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
