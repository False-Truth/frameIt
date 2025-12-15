import { useState, useMemo } from 'react';
import { Calendar, Download, Filter, Search, ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';

const dummyOrders = [
  {
    id: 'ORD001',
    customerName: 'John Smith',
    dateOfPurchase: '2024-01-15',
    productsBought: ['Wooden Frame A4', 'Glass Frame 5x7', 'Metal Frame 8x10'],
    totalAmount: 299.97
  },
  {
    id: 'ORD002',
    customerName: 'Sarah Johnson',
    dateOfPurchase: '2024-01-14',
    productsBought: ['Premium Frame Set', 'Custom Frame 11x14'],
    totalAmount: 459.99
  },
  {
    id: 'ORD003',
    customerName: 'Michael Davis',
    dateOfPurchase: '2024-01-13',
    productsBought: ['Basic Frame A3', 'Photo Print Package'],
    totalAmount: 189.50
  },
  {
    id: 'ORD004',
    customerName: 'Emily Wilson',
    dateOfPurchase: '2024-01-12',
    productsBought: ['Luxury Frame Gold', 'LED Frame Light'],
    totalAmount: 699.99
  },
  {
    id: 'ORD005',
    customerName: 'Robert Brown',
    dateOfPurchase: '2024-01-11',
    productsBought: ['Wall Frame Set', 'Table Frame Small'],
    totalAmount: 125.00
  },
  {
    id: 'ORD006',
    customerName: 'Jessica Martinez',
    dateOfPurchase: '2024-01-10',
    productsBought: ['Custom Frame Large', 'Matte Finish'],
    totalAmount: 350.75
  },
  {
    id: 'ORD007',
    customerName: 'David Anderson',
    dateOfPurchase: '2024-01-09',
    productsBought: ['Frame Bundle', 'Cleaning Kit'],
    totalAmount: 275.80
  },
  {
    id: 'ORD008',
    customerName: 'Lisa Thompson',
    dateOfPurchase: '2024-01-08',
    productsBought: ['Vintage Frame', 'Stand Pack'],
    totalAmount: 420.00
  }
];

const DatabaseQueryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState(null); // 'date' | 'amount' | null
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  const filteredOrders = useMemo(() => {
    let filtered = dummyOrders.filter(order => {
      const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.productsBought.some(product => 
                             product.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      
      const matchesDateFrom = !dateFrom || order.dateOfPurchase >= dateFrom;
      const matchesDateTo = !dateTo || order.dateOfPurchase <= dateTo;
      
      return matchesSearch && matchesDateFrom && matchesDateTo;
    });

    // Apply sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let aValue, bValue;
        
        if (sortBy === 'date') {
          aValue = new Date(a.dateOfPurchase);
          bValue = new Date(b.dateOfPurchase);
        } else if (sortBy === 'amount') {
          aValue = a.totalAmount;
          bValue = b.totalAmount;
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [searchTerm, dateFrom, dateTo, sortBy, sortOrder]);

  const handleDownloadBill = (order) => {
    const billContent = `ORDER BILL - ${order.id}
========================
Customer: ${order.customerName}
Date: ${order.dateOfPurchase}
------------------------
Products:
${order.productsBought.map(product => `- ${product}`).join('\n')}
------------------------
Total Amount: $${order.totalAmount.toFixed(2)}
========================
Thank you for your purchase!`;
    
    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bill_${order.id}_${order.customerName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortOrder === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-600" /> : 
      <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Database Query</h1>
          <p className="text-lg text-gray-600">Search and filter order data</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by customer name, order ID, or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filter by Date</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredOrders.length} of {dummyOrders.length} orders
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" 
                      onClick={() => handleSort('date')}>
                    <div className="flex items-center gap-1">
                      Date of Purchase
                      {getSortIcon('date')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products Bought
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('amount')}>
                    <div className="flex items-center gap-1">
                      Total Amount
                      {getSortIcon('amount')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{order.customerName}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{order.dateOfPurchase}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.productsBought.map((product, index) => (
                          <div key={index} className="mb-1">
                            • {product}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-green-600">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDownloadBill(order)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Bill</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No orders found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseQueryPage;
