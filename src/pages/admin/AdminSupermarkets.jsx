import { useState, useEffect } from 'react';
import { supermarketService } from '../../services';
import { DashboardSkeleton } from '../../components/ui';

const AdminSupermarkets = () => {
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSupermarket, setSelectedSupermarket] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchSupermarkets = async () => {
    try {
      setLoading(true);
      const res = await supermarketService.getAllSupermarkets();
      setSupermarkets(res.supermarkets || []);
    } catch (error) {
      console.error('Error fetching supermarkets:', error);
      setSupermarkets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupermarkets();
  }, []);

  const handleApprove = async (id) => {
    if (!window.confirm('Are you sure you want to approve this supermarket?')) return;
    try {
      setActionLoading(id);
      await supermarketService.updateSupermarket(id, { status: 'approved' });
      await fetchSupermarkets();
    } catch (error) {
      console.error('Error approving supermarket:', error);
      alert('Failed to approve supermarket');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this supermarket?')) return;
    try {
      setActionLoading(id);
      await supermarketService.updateSupermarket(id, { status: 'rejected' });
      await fetchSupermarkets();
    } catch (error) {
      console.error('Error rejecting supermarket:', error);
      alert('Failed to reject supermarket');
    } finally {
      setActionLoading(null);
    }
  };

  const handleBlock = async (id, currentStatus) => {
    const action = currentStatus === 'blocked' ? 'unblock' : 'block';
    if (!window.confirm(`Are you sure you want to ${action} this supermarket?`)) return;
    try {
      setActionLoading(id);
      await supermarketService.updateSupermarket(id, { isActive: currentStatus === 'blocked' });
      await fetchSupermarkets();
    } catch (error) {
      console.error('Error updating supermarket:', error);
      alert('Failed to update supermarket');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this supermarket? This action cannot be undone.')) return;
    try {
      setActionLoading(id);
      await supermarketService.deleteSupermarket(id);
      await fetchSupermarkets();
    } catch (error) {
      console.error('Error deleting supermarket:', error);
      alert('Failed to delete supermarket');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredSupermarkets = supermarkets.filter(supermarket => {
    const matchesSearch = 
      supermarket.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supermarket.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supermarket.ownerId?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'blocked' ? !supermarket.isActive : 
        filterStatus === 'pending' ? supermarket.status === 'pending' && supermarket.isActive :
        filterStatus === 'approved' ? supermarket.status === 'approved' && supermarket.isActive :
        filterStatus === 'rejected' ? supermarket.status === 'rejected' :
        true);
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (supermarket) => {
    if (!supermarket.isActive) return { label: 'Blocked', color: 'bg-gray-500 text-white' };
    if (supermarket.status === 'pending') return { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' };
    if (supermarket.status === 'approved') return { label: 'Approved', color: 'bg-green-100 text-green-700' };
    if (supermarket.status === 'rejected') return { label: 'Rejected', color: 'bg-red-100 text-red-700' };
    return { label: 'Unknown', color: 'bg-gray-100 text-gray-700' };
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  const pendingCount = supermarkets.filter(s => s.status === 'pending' && s.isActive).length;
  const approvedCount = supermarkets.filter(s => s.status === 'approved' && s.isActive).length;
  const rejectedCount = supermarkets.filter(s => s.status === 'rejected').length;
  const blockedCount = supermarkets.filter(s => !s.isActive).length;

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supermarket Management</h1>
          <p className="text-gray-600 mt-1">Total supermarkets: <span className="font-semibold text-green-600">{supermarkets.length}</span></p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all" onClick={() => setFilterStatus('pending')}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all" onClick={() => setFilterStatus('approved')}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{approvedCount}</p>
              <p className="text-xs text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all" onClick={() => setFilterStatus('rejected')}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{rejectedCount}</p>
              <p className="text-xs text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all" onClick={() => setFilterStatus('blocked')}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{blockedCount}</p>
              <p className="text-xs text-gray-500">Blocked</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all" onClick={() => setFilterStatus('all')}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{supermarkets.length}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, location, or owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Supermarkets Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Supermarket</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSupermarkets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No supermarkets found
                  </td>
                </tr>
              ) : (
                filteredSupermarkets.map((supermarket) => {
                  const statusBadge = getStatusBadge(supermarket);
                  return (
                    <tr key={supermarket._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                            {supermarket.logo ? (
                              <img 
                                src={`http://localhost:5000${supermarket.logo}`} 
                                alt={supermarket.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600 font-bold text-lg">
                                {supermarket.name?.charAt(0)?.toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{supermarket.name}</p>
                            <p className="text-xs text-gray-500">ID: {supermarket._id?.slice(-8).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{supermarket.ownerId?.name || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{supermarket.ownerId?.email}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{supermarket.location}</td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">{supermarket.phone}</p>
                        <p className="text-xs text-gray-500">{supermarket.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedSupermarket(supermarket)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="View Details"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          
                          {supermarket.status === 'pending' && supermarket.isActive && (
                            <>
                              <button
                                onClick={() => handleApprove(supermarket._id)}
                                disabled={actionLoading === supermarket._id}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                title="Approve"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleReject(supermarket._id)}
                                disabled={actionLoading === supermarket._id}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                title="Reject"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </>
                          )}
                          
                          {supermarket.status === 'approved' && supermarket.isActive && (
                            <button
                              onClick={() => handleBlock(supermarket._id, 'active')}
                              disabled={actionLoading === supermarket._id}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                              title="Block"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                            </button>
                          )}

                          {supermarket.status === 'approved' && !supermarket.isActive && (
                            <button
                              onClick={() => handleBlock(supermarket._id, 'blocked')}
                              disabled={actionLoading === supermarket._id}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                              title="Unblock"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(supermarket._id)}
                            disabled={actionLoading === supermarket._id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supermarket Details Modal */}
      {selectedSupermarket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedSupermarket(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-scale-in">
            <button
              onClick={() => setSelectedSupermarket(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
                {selectedSupermarket.logo ? (
                  <img 
                    src={`http://localhost:5000${selectedSupermarket.logo}`} 
                    alt={selectedSupermarket.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600 font-bold text-2xl">
                    {selectedSupermarket.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedSupermarket.name}</h2>
                <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full mt-1 ${getStatusBadge(selectedSupermarket).color}`}>
                  {getStatusBadge(selectedSupermarket).label}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Owner Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSupermarket.ownerId?.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSupermarket.ownerId?.email || 'Unknown'}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSupermarket.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSupermarket.email}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSupermarket.location}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedSupermarket.description || 'No description available'}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedSupermarket.createdAt ? new Date(selectedSupermarket.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Supermarket ID</p>
                    <p className="text-sm font-medium text-gray-900 font-mono">{selectedSupermarket._id}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {selectedSupermarket.status === 'pending' && selectedSupermarket.isActive && (
                <>
                  <button
                    onClick={() => { handleApprove(selectedSupermarket._id); setSelectedSupermarket(null); }}
                    className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => { handleReject(selectedSupermarket._id); setSelectedSupermarket(null); }}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                  >
                    Reject
                  </button>
                </>
              )}
              {selectedSupermarket.status === 'approved' && selectedSupermarket.isActive && (
                <button
                  onClick={() => { handleBlock(selectedSupermarket._id, 'active'); setSelectedSupermarket(null); }}
                  className="flex-1 px-4 py-2.5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium"
                >
                  Block Supermarket
                </button>
              )}
              {selectedSupermarket.status === 'approved' && !selectedSupermarket.isActive && (
                <button
                  onClick={() => { handleBlock(selectedSupermarket._id, 'blocked'); setSelectedSupermarket(null); }}
                  className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  Unblock Supermarket
                </button>
              )}
              <button
                onClick={() => { handleDelete(selectedSupermarket._id); setSelectedSupermarket(null); }}
                className="px-4 py-2.5 border-2 border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSupermarkets;
