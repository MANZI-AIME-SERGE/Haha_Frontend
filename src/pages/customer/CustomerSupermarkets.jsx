import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supermarketService } from '../../services';

const CustomerSupermarkets = () => {
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupermarkets();
  }, []);

  const fetchSupermarkets = async () => {
    try {
      setLoading(true);
      const res = await supermarketService.getSupermarkets();
      setSupermarkets(res.supermarkets || []);
    } catch (error) {
      console.error('Error fetching supermarkets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Partner Supermarkets</h1>
          <p className="text-gray-600">Quality stores you can trust</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))
          ) : supermarkets.length > 0 ? (
            supermarkets.map((supermarket) => (
              <div
                key={supermarket._id}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`http://localhost:5000${supermarket.logo}`}
                    alt={supermarket.name}
                    className="w-16 h-16 rounded-full object-cover bg-gray-100"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64?text=Store';
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{supermarket.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {supermarket.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{supermarket.description}</p>
                <Link
                  to={`/customer/products?supermarket=${supermarket._id}`}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                >
                  View Products
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No supermarkets available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSupermarkets;
