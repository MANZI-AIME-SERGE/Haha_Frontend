import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { productService } from '../services/productService'
import ProductCard from '../components/common/ProductCard'
import { FiShoppingBag, FiTruck, FiShield, FiSmile } from 'react-icons/fi'

const LandingPage = () => {
  const { user } = useAuth()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts({ limit: 8 })
        setFeaturedProducts(data.products)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const features = [
    { icon: <FiShoppingBag className="text-4xl text-primary-600" />, title: "Wide Selection", description: "Thousands of products across multiple categories" },
    { icon: <FiTruck className="text-4xl text-primary-600" />, title: "Fast Delivery", description: "Quick delivery to your doorstep" },
    { icon: <FiShield className="text-4xl text-primary-600" />, title: "Quality Guaranteed", description: "100% fresh and quality products" },
    { icon: <FiSmile className="text-4xl text-primary-600" />, title: "Best Prices", description: "Affordable prices with regular discounts" }
  ]

  return (
    <div className="fade-in">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div><h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to HAHA Supermarket</h1><p className="text-xl mb-8">Your one-stop shop for fresh groceries and quality products.</p><div className="flex gap-4"><Link to="/products" className="btn-primary bg-white text-primary-600">Shop Now</Link>{!user && <Link to="/register" className="btn-outline border-white text-white">Create Account</Link>}</div></div>
            <div className="hidden md:block"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500" alt="Supermarket" className="rounded-lg shadow-2xl" /></div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4"><h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2><div className="grid md:grid-cols-4 gap-8">{features.map((f, i) => (<div key={i} className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg"><div className="flex justify-center mb-4">{f.icon}</div><h3 className="text-xl font-semibold mb-2">{f.title}</h3><p className="text-gray-600 dark:text-gray-400">{f.description}</p></div>))}</div></div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4"><div className="flex justify-between items-center mb-12"><h2 className="text-3xl font-bold">Featured Products</h2><Link to="/products" className="text-primary-600">View All →</Link></div>{loading ? <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div></div> : <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{featuredProducts.map(p => <ProductCard key={p._id} product={p} />)}</div>}</div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4"><div className="grid md:grid-cols-2 gap-12 items-center"><div><img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500" alt="Interior" className="rounded-lg shadow-2xl" /></div><div><h2 className="text-3xl font-bold mb-6">About HAHA Supermarket</h2><p className="text-gray-600 dark:text-gray-400 mb-6">Located in Kigali, we serve the community with quality products and excellent service.</p><div className="space-y-2"><p>📍 KG 123 St, Kigali, Rwanda</p><p>📞 +250 788 888 888</p><p>📧 info@hahasupermarket.rw</p></div><Link to="/products" className="btn-primary inline-block mt-8">Explore Products</Link></div></div></div>
      </section>
    </div>
  )
}

export default LandingPage