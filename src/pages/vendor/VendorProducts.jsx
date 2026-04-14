import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services';

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getMyProducts();
      setProducts(res.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
        <Link
          to="/vendor/products/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Product
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
              <div className="h-40 bg-gray-200 rounded-lg mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover bg-gray-100"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x160?text=Product'; }}
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-blue-600">RWF {product.price?.toLocaleString()}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500 mb-4">You haven't added any products yet.</p>
          <Link
            to="/vendor/products/add"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Add Your First Product
          </Link>
        </div>
      )}
    </div>
  );
};

export default VendorProducts;
