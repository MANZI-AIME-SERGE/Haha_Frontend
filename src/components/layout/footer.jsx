import React from 'react'
import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiClock, FiTruck, FiShield, FiHeart } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-primary-500">HAHA</span>
              <span className="text-xl font-semibold">Supermarket</span>
            </div>
            <p className="text-gray-400 mb-4">Your one-stop shop for all your grocery needs. Quality products at affordable prices.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center"><FiFacebook /></a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center"><FiInstagram /></a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center"><FiTwitter /></a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center"><FiYoutube /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-500">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-primary-500">Products</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-500">About Us</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-primary-500">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=Drinks" className="text-gray-400 hover:text-primary-500">Drinks</Link></li>
              <li><Link to="/products?category=Foods" className="text-gray-400 hover:text-primary-500">Foods</Link></li>
              <li><Link to="/products?category=Hygiene" className="text-gray-400 hover:text-primary-500">Hygiene</Link></li>
              <li><Link to="/products?category=Vegetables" className="text-gray-400 hover:text-primary-500">Vegetables</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3"><FiMapPin className="mt-1 text-primary-500" /><span className="text-gray-400">KG 123 St, Kigali, Rwanda</span></div>
              <div className="flex items-center space-x-3"><FiPhone className="text-primary-500" /><span className="text-gray-400">+250 788 888 888</span></div>
              <div className="flex items-center space-x-3"><FiMail className="text-primary-500" /><span className="text-gray-400">info@hahasupermarket.rw</span></div>
              <div className="flex items-start space-x-3"><FiClock className="mt-1 text-primary-500" /><div><p className="text-gray-400">Mon-Fri: 8AM-9PM</p><p className="text-gray-400">Sat-Sun: 9AM-8PM</p></div></div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3"><FiTruck className="text-2xl text-primary-500" /><div><p className="font-semibold">Free Delivery</p><p className="text-sm text-gray-400">On orders over RWF 50,000</p></div></div>
            <div className="flex items-center space-x-3"><FiShield className="text-2xl text-primary-500" /><div><p className="font-semibold">Secure Payment</p><p className="text-sm text-gray-400">100% secure transactions</p></div></div>
            <div className="flex items-center space-x-3"><FiClock className="text-2xl text-primary-500" /><div><p className="font-semibold">24/7 Support</p><p className="text-sm text-gray-400">Always ready to help</p></div></div>
          </div>
          <p className="text-center text-gray-400 text-sm">&copy; {currentYear} HAHA Supermarket. Made with <FiHeart className="inline text-red-500" /> in Kigali, Rwanda</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer