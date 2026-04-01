import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { FiShoppingCart, FiEye } from 'react-icons/fi'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const discountedPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (product.stock > 0) addToCart(product, 1)
    else toast.error('Out of stock')
  }

  return (
    <div className="card group">
      <Link to={`/products/${product._id}`}>
        <div className="relative overflow-hidden h-48">
          <img src={product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
          {product.discount > 0 && <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-sm font-bold">-{product.discount}%</div>}
          {product.stock === 0 && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><span className="text-white font-bold">Out of Stock</span></div>}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mb-3">
            <div>{product.discount > 0 ? (<div><span className="text-2xl font-bold text-primary-600">RWF {discountedPrice.toLocaleString()}</span><span className="text-sm text-gray-500 line-through ml-2">RWF {product.price.toLocaleString()}</span></div>) : (<span className="text-2xl font-bold text-primary-600">RWF {product.price.toLocaleString()}</span>)}</div>
            <div className="flex space-x-2">
              <button onClick={handleAddToCart} disabled={product.stock === 0} className="p-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50"><FiShoppingCart /></button>
              <Link to={`/products/${product._id}`} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"><FiEye /></Link>
            </div>
          </div>
          {product.stock > 0 && product.stock < 10 && <p className="text-xs text-orange-600">Only {product.stock} left</p>}
        </div>
      </Link>
    </div>
  )
}

export default ProductCard