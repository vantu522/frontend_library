import React, { useState, useEffect } from 'react';
import borrowService from '../../../../services/admin/borrowService';
import Modal from '../../../../common/admin/Modal/Modal';
import Table from '../../../../common/admin/Table/Table';
import Button from '../../../../common/admin/Button/Button';
import Tooltip from '../../../../common/admin/Tooltip/Tooltip';
import { FaCheckCircle, FaReplyAll, FaPlus } from 'react-icons/fa';
import AddBorrowForm from '../AddBorrowForm/AddBorrowForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BorrowList = () => {
  // State
  const [borrows, setBorrows] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    actionType: null,
    borrowData: null,
  });

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const data = await borrowService.fetchAllBorrowed();
        setBorrows(data);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu phiếu mượn.');
      }
    };

    fetchBorrows();
  }, []);

  // Gọi API Trả sách
  const handleReturnBook = async () => {
    const { borrowData } = confirmModal;
    try {
      await borrowService.returnBook({
        name: borrowData.memberName,
        title: borrowData.bookTitle,
        numberPhone: borrowData.phoneNumber,
      });
      toast.success(`Sách "${borrowData.bookTitle}" đã được trả thành công.`);
      setBorrows((prev) =>
        prev.map((b) =>
          b.id === borrowData.id ? { ...b, status: 'returned' } : b
        )
      );
    } catch (error) {
      toast.error('Lỗi khi trả sách.');
    }
    closeConfirmModal();
  };

  // Gọi API Gia hạn sách
  const handleRenewBook = async () => {
    const { borrowData } = confirmModal;
    try {
      await borrowService.renewBook({
        name: borrowData.memberName,
        title: borrowData.bookTitle,
        numberPhone: borrowData.phoneNumber,
      });
      toast.success(`Sách "${borrowData.bookTitle}" đã được gia hạn thành công.`);
    } catch (error) {
      toast.error('Lỗi khi gia hạn sách.');
    }
    closeConfirmModal();
  };

  // Mở modal xác nhận
  const openConfirmModal = (actionType, borrowData) => {
    setConfirmModal({ isOpen: true, actionType, borrowData });
  };

  // Đóng modal xác nhận
  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, actionType: null, borrowData: null });
  };

  // Lọc danh sách
  const filteredBorrows = borrows.filter((borrow) => {
    const matchesSearch =
      (borrow.bookTitle &&
        borrow.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (borrow.memberName &&
        borrow.memberName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === 'all' || borrow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Cấu hình bảng
  const columns = [
    { label: 'Tên người mượn', field: 'memberName' },
    { label: 'Tên sách', field: 'bookTitle' },
    { label: 'Số điện thoại', field: 'phoneNumber' },
    { label: 'Ngày mượn', field: 'transactionDate' },
    { label: 'Ngày trả dự kiến', field: 'dueDate' },
    {
      label: 'Trạng thái',
      field: 'status',
      render: (val) => (
        <span
          className={`font-bold ${
            val === 'overdue' ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {val === 'overdue' ? 'Quá hạn' : 'Đang mượn'}
        </span>
      ),
    },
    {
      label: 'Hành động',
      width: 180,
      render: (val, row) => (
        <>
          {/* Trả sách */}
          <Tooltip content="Đánh dấu đã trả" position="left">
            <button
              onClick={() => openConfirmModal('return', row)}
              className="text-green-500 hover:text-green-700 mx-2"
            >
              <FaCheckCircle size={18} />
            </button>
          </Tooltip>

          {/* Gia hạn sách */}
          <Tooltip content="Gia hạn sách" position="left">
            <button
              onClick={() => openConfirmModal('renew', row)}
              className="text-blue-500 hover:text-blue-700 mx-2"
            >
              <FaReplyAll size={18} />
            </button>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div className="p-5 font-sans">
      {/* Modal xác nhận */}
      {confirmModal.isOpen && (
        <Modal isOpen={confirmModal.isOpen} onClose={closeConfirmModal}>
          <h2 className="text-xl font-semibold mb-4">
            {confirmModal.actionType === 'return'
              ? 'Xác nhận trả sách'
              : 'Xác nhận gia hạn sách'}
          </h2>
          <p className="mb-4">
            Bạn có chắc muốn{' '}
            <strong>
              {confirmModal.actionType === 'return' ? 'trả sách' : 'gia hạn sách'}
            </strong>{' '}
            <span className="text-blue-500">
              "{confirmModal.borrowData.bookTitle}"
            </span>{' '}
            cho <span className="text-green-500">{confirmModal.borrowData.memberName}</span>?
          </p>
          <div className="flex justify-end gap-3">
            <Button
              label="Hủy"
              onClick={closeConfirmModal}
              className="bg-gray-300 hover:bg-gray-400"
            />
            <Button
              label="Xác nhận"
              onClick={
                confirmModal.actionType === 'return'
                  ? handleReturnBook
                  : handleRenewBook
              }
              className="bg-blue-500 hover:bg-blue-600 text-white"
            />
          </div>
        </Modal>
      )}

      {/* Modal thêm phiếu mượn */}
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        <AddBorrowForm
          setVisibleForm={setVisibleForm}
          onAdd={(newBorrow) => setBorrows((prev) => [...prev, newBorrow])}
        />
      </Modal>

      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-4">Danh Sách Phiếu Mượn</h1>

      {/* Tìm kiếm và bộ lọc */}
      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-64"
        />
        <div className="flex gap-3">
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
            className="p-2 border rounded-md"
          >
            <option value="all">Tất cả</option>
            <option value="active">Đang mượn</option>
            <option value="returned">Đã trả</option>
            <option value="overdue">Quá hạn</option>
          </select>
          <button
            onClick={() => setVisibleForm(true)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            <FaPlus /> Thêm phiếu mượn
          </button>
        </div>
      </div>

      {/* Bảng */}
      <Table columns={columns} data={filteredBorrows} />
    </div>
  );
};

export default BorrowList;
