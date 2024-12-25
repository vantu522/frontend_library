import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../common/admin/Pagination';
const API_ENDPOINTS = {
  BASE_URL: 'https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net',
  TRANSACTIONS: {
    USER: '/transactions/user'
  }
};

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);

        if (!user?.memberId) {
          throw new Error('User ID not found');
        }

        const response = await axios.get(
          `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.TRANSACTIONS.USER}`,
          {
            params: { memberId: user.memberId },
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response);

        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const displayedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-20 border rounded-md shadow-md">
      <div className="p-4 border-b bg-gray-100">
        <h2 className="text-lg font-bold">Danh sách giao dịch</h2>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-blue-500 text-white">STT</th>
                <th className="border p-2 bg-blue-500 text-white">Tên sách</th>
                <th className="border p-2 bg-blue-500 text-white">Ngày mượn</th>
                <th className="border p-2 bg-blue-500 text-white">Ngày trả</th>
                <th className="border p-2 bg-blue-500 text-white">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="border p-2">{transaction.title}</td>
                  <td className="border p-2 text-center">
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2 text-center">
                    {transaction.dueDate && new Date(transaction.dueDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2 text-center">
                    <span className={`font-medium ${
                      transaction.status === 'Đang mượn' ? 'text-yellow-500' : 
                      transaction.status === 'Đã trả' ? 'text-green-500' : 
                      'text-gray-500'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          ⬆
        </button>
      </div>
    </div>
  );
};

export default TransactionList;
