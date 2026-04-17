import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../../services';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchOrders();
    const pollInterval = setInterval(fetchOrders, 10000);
    return () => clearInterval(pollInterval);
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getVendorOrders();
      setOrders(res.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setUpdating(orderId);
      await orderService.updateOrderStatus(orderId, newStatus);
      await fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      completed: 'bg-green-500 text-white',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getNextStatus = (currentStatus) => {
    const flow = {
      pending: 'processing',
      processing: 'shipped',
      shipped: 'delivered',
      delivered: 'completed',
    };
    return flow[currentStatus];
  };

  const getStatusLabel = (currentStatus) => {
    const labels = {
      pending: 'Approve',
      processing: 'Ship',
      shipped: 'Mark Delivered',
      delivered: 'Complete',
    };
    return labels[currentStatus];
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const processingOrders = orders.filter(o => o.status === 'processing');
  const shippedOrders = orders.filter(o => o.status === 'shipped');
  const completedOrders = orders.filter(o => ['delivered', 'completed'].includes(o.status));
  const cancelledOrders = orders.filter(o => o.status === 'cancelled');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customer Orders</h1>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <p className="text-sm text-yellow-600 font-medium">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">{pendingOrders.length}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Processing</p>
          <p className="text-2xl font-bold text-blue-700">{processingOrders.length}</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Shipped</p>
          <p className="text-2xl font-bold text-purple-700">{shippedOrders.length}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-sm text-green-600 font-medium">Completed</p>
          <p className="text-2xl font-bold text-green-700">{completedOrders.length}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-sm text-red-600 font-medium">Cancelled</p>
          <p className="text-2xl font-bold text-red-700">{cancelledOrders.length}</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p><span className="font-medium">Customer:</span> {order.customerId?.name || 'Unknown'}</p>
                      <p><span className="font-medium">Phone:</span> {order.customerId?.phone || order.deliveryAddress?.phone || 'N/A'}</p>
                      <p><span className="font-medium">Address:</span> {order.deliveryAddress ? `${order.deliveryAddress.street}, ${order.deliveryAddress.district}` : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    <p className="text-xl font-bold text-green-600 mt-1">RWF {order.grandTotal?.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Total (incl. delivery)</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          <span className="font-medium">{item.quantity}x</span> {item.name}
                        </span>
                        <span className="font-medium">RWF {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <p>Payment: <span className="font-medium capitalize">{order.paymentMethod || 'cash'}</span></p>
                    <p>Delivery Fee: RWF {order.deliveryFee?.toLocaleString()}</p>
                  </div>
                  
                  {order.status !== 'completed' && order.status !== 'cancelled' && (
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(order._id, 'cancelled')}
                          disabled={updating === order._id}
                          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => handleUpdateStatus(order._id, getNextStatus(order.status))}
                        disabled={updating === order._id}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {updating === order._id ? 'Updating...' : getStatusLabel(order.status)}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500">No orders yet.</p>
          <p className="text-sm text-gray-400 mt-1">Orders from customers will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default VendorOrders;
