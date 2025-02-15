import React, { useState, useEffect } from 'react';
import borrowService from '../../../services/admin/borrowService';
import Modal from '../../../common/admin/Modal/Modal';
import Table from '../../../common/admin/Table/Table';
import Button from '../../../common/admin/Button/Button';
import Tooltip from '../../../common/admin/Tooltip/Tooltip';
import { FaCheckCircle, FaRecycle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BorrowList = () => {
  // State
  const [borrows, setBorrows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    actionType: null,
    borrowData: null,
  });
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const { borrowData } = confirmModal;
    try {
      // Gọi API trả sách
      await borrowService.returnBook({
        name: borrowData.memberName,
        title: borrowData.bookTitle,
        phoneNumber: borrowData.phoneNumber,
      });
  
      // Cập nhật state trực tiếp bằng cách lọc ra phiếu mượn cần xóa
      setBorrows(prevBorrows => 
        prevBorrows.filter(borrow => {
          // So sánh các trường dữ liệu để đảm bảo xóa đúng phiếu mượn
          return !(
            borrow.memberName === borrowData.memberName &&
            borrow.bookTitle === borrowData.bookTitle &&
            borrow.phoneNumber === borrowData.phoneNumber
          );
        })
      );
  
      // Hiển thị thông báo thành công
      toast.success(`Sách "${borrowData.bookTitle}" đã được trả thành công.`);
    } catch (error) {
      toast.error('Lỗi khi trả sách.');
    } finally {
      setIsLoading(false);
      closeConfirmModal();
    }
  };
  // Gọi API Gia hạn sách
  const handleRenewBook = async () => {
    setIsLoading(true);
    const { borrowData } = confirmModal;
    try {
      await borrowService.renewBook({
        name: borrowData.memberName,
        title: borrowData.bookTitle,
        phoneNumber: borrowData.phoneNumber,
      });

      toast.success(`Sách "${borrowData.bookTitle}" đã được gia hạn thành công.`);
      const updatedBorrows = await borrowService.fetchAllBorrowed();
      setBorrows(updatedBorrows);
    } catch (error) {
      toast.error('Lỗi khi gia hạn sách.');
    } finally {
      setIsLoading(false);
      closeConfirmModal();
    }
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
        borrow.memberName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (borrow.phoneNumber &&
        borrow.phoneNumber.includes(searchTerm));

    const matchesStatus =
      statusFilter === 'all' || borrow.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Định dạng ngày, chỉ lấy phần ngày
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString(); // Trả về định dạng ngày (DD/MM/YYYY)
  };

  // So sánh ngày quá hạn
  const isOverdue = (dueDate) => {
    const today = new Date();
    return new Date(dueDate) < today;
  };

  // Cấu hình bảng
  const columns = [
    { label: 'Tên người mượn', field: 'memberName' },
    { label: 'Tên sách', field: 'bookTitle', render: (val) => <span className="font-semibold">{val}</span> },
    { label: 'Số điện thoại', field: 'phoneNumber' },
    { label: 'Ngày mượn', field: 'transactionDate', render: (val) => formatDate(val) },
    { label: 'Ngày trả dự kiến', field: 'dueDate', render: (val) => formatDate(val) },
    {
      label: 'Trạng thái',
      field: 'status',
      render: (val, row) => (
        <span
          className={`font-bold ${isOverdue(row.dueDate) ? 'text-red-500' : 'text-green-500'}`}
        >
          {isOverdue(row.dueDate) ? 'Quá hạn' : 'Đang mượn'}
        </span>
      ),
    },
    {
      label: 'Hành động',
      width: 180,
      render: (val, row) => (
        <>
          <div className="flex justify-center">
            {/* Trả sách */}
            <Tooltip content="Đánh dấu đã trả" position="left">
              <button
                onClick={() => openConfirmModal('return', row)}
                className="text-green-500 hover:text-green-700 mx-2"
              >
                <FaCheckCircle size={25} />
              </button>
            </Tooltip>

            {/* Gia hạn sách */}
            <Tooltip content="Gia hạn sách" position="left">
              <button
                onClick={() => openConfirmModal('renew', row)}
                className="text-blue-500 hover:text-blue-700 mx-2"
              >
                <FaRecycle size={25} />
              </button>
            </Tooltip>
          </div>
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
            {' '}
            <span className="text-green-500">
              {confirmModal.borrowData.memberName}
            </span>
            {' '}
            muốn{' '}
            <strong>
              {confirmModal.actionType === 'return' ? 'trả sách' : 'gia hạn sách'}
            </strong>{' '}
            <span className="text-blue-500">
              "{confirmModal.borrowData.bookTitle}"
            </span>{' '}
            ?
          </p>
          <div className="flex justify-end gap-3">
            <Button
              onClick={confirmModal.actionType === 'return' ? handleReturnBook : handleRenewBook}
              disabled={isLoading}
              
            >
              {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
            </Button>
          </div>
        </Modal>
      )}

      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-4">Danh Sách Phiếu Mượn</h1>

      {/* Tìm kiếm */}
      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-64"
        />
      </div>

    
        <Table columns={columns} data={filteredBorrows} className="text-center" />
    </div>
  );
};

export default BorrowList;
