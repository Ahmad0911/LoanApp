import { useState } from "react";
import { Search, RefreshCw, LogOut, TrendingUp, Users, DollarSign, Clock, X, Eye } from "lucide-react";

interface Loan {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  houseAddress: string;
  workAddress: string;
  loanAmount: number;
  loanType: string;
  loanDuration: string;
  idFront: string;
  idBack: string;
  ssnFront: string;
  ssnBack: string;
  status: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [loans, setLoans] = useState<Loan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");

  const BASE_URL = "https://sterling-financials-backend.onrender.com/api/loans";
  const ADMIN_API_KEY = "supersecretadminkey123";
  const ADMIN_PASSCODE = "admin2024";

  const handleLogin = () => {
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setAuthError("");
      fetchLoans();
    } else {
      setAuthError("Invalid passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode("");
    setLoans([]);
  };

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL, {
        headers: {
          "x-api-key": ADMIN_API_KEY,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch loans");
      setLoans(data.loans || []);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateLoanStatus = async (loanId: string, status: string) => {
    setActionLoading(loanId);
    try {
      const response = await fetch(`${BASE_URL}/${loanId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ADMIN_API_KEY,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update status");

      setLoans(loans.map(loan => 
        loan._id === loanId ? { ...loan, status } : loan
      ));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteLoan = async (loanId: string) => {
    if (!window.confirm("Are you sure you want to delete this loan application?")) return;
    
    setActionLoading(loanId);
    try {
      const response = await fetch(`${BASE_URL}/${loanId}`, {
        method: "DELETE",
        headers: {
          "x-api-key": ADMIN_API_KEY,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete loan");

      setLoans(loans.filter(loan => loan._id !== loanId));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const openImageModal = (imageUrl: string, title: string) => {
    setModalImage(imageUrl);
    setModalTitle(title);
  };

  const closeImageModal = () => {
    setModalImage(null);
    setModalTitle("");
  };

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch = loan.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || loan.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const stats = {
    total: loans.length,
    pending: loans.filter(l => l.status === "pending").length,
    approved: loans.filter(l => l.status === "approved").length,
    rejected: loans.filter(l => l.status === "rejected").length,
    totalAmount: loans.reduce((sum, l) => sum + l.loanAmount, 0),
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-4xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Admin Portal</h2>
            <p className="text-gray-500 mt-2">Sterling & Co Financials</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Access Code
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter your passcode"
            />
          </div>

          {authError && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm">
              {authError}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Image Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="bg-gray-100 p-4 flex justify-between items-center border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{modalTitle}</h3>
              <button
                onClick={closeImageModal}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 bg-gray-50 flex justify-center">
              <img 
                src={modalImage} 
                alt={modalTitle}
                className="max-h-96 object-contain rounded-lg"
              />
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeImageModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Sterling & Co Financials
              </h1>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.total}</span>
            </div>
            <p className="text-blue-100 text-sm font-medium">Total Applications</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.pending}</span>
            </div>
            <p className="text-yellow-100 text-sm font-medium">Pending Review</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.approved}</span>
            </div>
            <p className="text-green-100 text-sm font-medium">Approved</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 opacity-80" />
              <span className="text-2xl font-bold">₦{(stats.totalAmount / 1000000).toFixed(1)}M</span>
            </div>
            <p className="text-purple-100 text-sm font-medium">Total Amount</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              onClick={fetchLoans}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredLoans.length}</span> of <span className="font-semibold">{loans.length}</span> applications
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading applications...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 text-red-700">
            {error}
          </div>
        ) : filteredLoans.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No loan applications found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Applicant</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Loan Details</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Documents</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLoans.map((loan) => (
                    <tr key={loan._id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{loan.fullName}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(loan.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{loan.email}</div>
                        <div className="text-xs text-gray-500">{loan.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          ₦{loan.loanAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {loan.loanType} • {loan.loanDuration} months
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(loan.status || 'pending')}`}>
                          {(loan.status || 'pending').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => openImageModal(loan.idFront, `${loan.fullName} - ID Front`)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium hover:bg-blue-50 px-2 py-1 rounded transition"
                          >
                            <Eye className="w-3 h-3" />
                            ID Front
                          </button>
                          <button
                            onClick={() => openImageModal(loan.idBack, `${loan.fullName} - ID Back`)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium hover:bg-blue-50 px-2 py-1 rounded transition"
                          >
                            <Eye className="w-3 h-3" />
                            ID Back
                          </button>
                          <button
                            onClick={() => openImageModal(loan.ssnFront, `${loan.fullName} - SSN Front`)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium hover:bg-blue-50 px-2 py-1 rounded transition"
                          >
                            <Eye className="w-3 h-3" />
                            SSN
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {loan.status !== 'approved' && (
                            <button
                              onClick={() => updateLoanStatus(loan._id, 'approved')}
                              disabled={actionLoading === loan._id}
                              className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading === loan._id ? '...' : 'Approve'}
                            </button>
                          )}
                          {loan.status !== 'rejected' && (
                            <button
                              onClick={() => updateLoanStatus(loan._id, 'rejected')}
                              disabled={actionLoading === loan._id}
                              className="px-3 py-1.5 bg-yellow-600 text-white rounded-lg text-xs font-medium hover:bg-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {actionLoading === loan._id ? '...' : 'Reject'}
                            </button>
                          )}
                          <button
                            onClick={() => deleteLoan(loan._id)}
                            disabled={actionLoading === loan._id}
                            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {actionLoading === loan._id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;