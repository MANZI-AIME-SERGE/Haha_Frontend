import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productService } from '../../services';
import { ProductCard, ProductGridSkeleton } from '../../components/ui';

const CustomerProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

  const categories = ['Drinks', 'Foods', 'Hygiene', 'Vegetables'];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;
      
      const res = await productService.getProducts(params);
      setProducts(res.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set('search', searchQuery);
    if (selectedCategory) newParams.set('category', selectedCategory);
    setSearchParams(newParams);
    fetchProducts();
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set('search', searchQuery);
    if (category && category !== selectedCategory) newParams.set('category', category);
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Products</h1>
          
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryClick('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No products found.</p>
              <Link to="/customer/products" className="text-blue-600 hover:underline mt-2 inline-block">
                View all products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProducts;
