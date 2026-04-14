import { Link } from 'react-router-dom';
import { useCart } from '../../context';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  
  const supermarketName = product.supermarketId?.name || 'Unknown Store';

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
              {product.category}
            </span>
          </div>
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded-full">
                Only {product.stock} left
              </span>
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="px-4 py-2 text-white font-semibold bg-red-600 rounded-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product._id}`} className="block">
          <h3 className="font-semibold text-lg text-gray-800 mb-1 hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {supermarketName}
        </p>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              RWF {product.price.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95'
              }
            `}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
