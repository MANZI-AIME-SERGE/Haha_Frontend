import { Link } from 'react-router-dom';
import { useAuth, useCart } from '../../context';

const CustomerCart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const subtotal = getCartTotal();
  const deliveryFee = cart.length > 0 ? 1000 : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <Link
            to="/customer/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button onClick={clearCart} className="text-red-600 hover:text-red-700 font-medium">
            Clear Cart
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover bg-gray-100"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/96?text=Product'; }}
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.supermarketId?.name || 'Unknown Store'}</p>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100">-</button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100">+</button>
                  </div>
                  <p className="text-lg font-bold text-blue-600">RWF {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>RWF {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>RWF {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span className="text-blue-600">RWF {total.toLocaleString()}</span>
            </div>
          </div>
          <Link
            to="/customer/checkout"
            className="block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerCart;
