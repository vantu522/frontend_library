import React, { useState, useEffect } from 'react';
import borrowService from '../../../../services/admin/borrowService';
import Modal from '../../../../common/admin/Modal/Modal';
import Table from '../../../../common/admin/Table/Table';
import Button from '../../../../common/admin/Button/Button';
import Tooltip from '../../../../common/admin/Tooltip/Tooltip';
import { FaCheckCircle, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';

const PendingBorrowList = () => {
  const [borrows, setBorrows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState({});
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    fetchPendingBorrowList();
  }, []);

  const fetchPendingBorrowList = async () => {
    try {
      const data = await borrowService.fetchAllPending();
      setBorrows(data);
    } catch (error) {
      toast.error('Không thể tải danh sách phiếu mượn đang chờ');
    }
  };

  const handleApprove = async () => {
    const { borrow, isAprove } = confirmAction;
    try {
      const payload = {
        name: borrow.memberName,
        title: borrow.bookTitle,
        phoneNumber: borrow.phoneNumber,
        isAprove: isAprove,
      };

      await borrowService.approveTransaction(payload);

      toast.success(
        isAprove
          ? `Phiếu mượn "${borrow.bookTitle}" đã được xác nhận.`
          : `Phiếu mượn "${borrow.bookTitle}" đã bị từ chối.`
      );

      setBorrows((prev) => prev.filter((b) => b.id !== borrow.id));
      setShowConfirmModal(false);
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái phiếu mượn.');
    }
  };

  const debouncedSearch = debounce((e) => {
    setSearchTerm(e.target.value);
  }, 500);

  const columns = [
    { label: 'Tên sách', field: 'bookTitle' },
    { label: 'Tên người mượn', field: 'memberName' },
    { label: 'Số điện thoại', field: 'phoneNumber' },
    { label: 'Ngày mượn', field: 'transactionDate' },
    { label: 'Ngày trả dự kiến', field: 'dueDate' },
    {
      label: 'Trạng thái',
      render: () => <span className="text-red-500">Đang chờ</span>,
    },
    {
      label: 'Hành động',
      render: (val, row) => (
        <>
          <Tooltip content="Xác nhận">
            <button
              onClick={() => {
                setConfirmAction({ borrow: row, isAprove: true });
                setShowConfirmModal(true);
              }}
              className="text-green-500 hover:text-green-700 mr-2"
            >
              <FaCheckCircle />
            </button>
          </Tooltip>
          <Tooltip content="Từ chối">
            <button
              onClick={() => {
                setConfirmAction({ borrow: row, isAprove: false });
                setShowConfirmModal(true);
              }}
              className="text-yellow-500 hover:text-yellow-700 mr-2"
            >
              <FaExclamationTriangle />
            </button>
          </Tooltip>
          <Tooltip content="Xóa">
            <button
              onClick={() => {
                setDeleteTargetId(row.id);
                setShowDeleteModal(true);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </Tooltip>
        </>
      ),
    },
  ];

  const filteredBorrows = borrows.filter((borrow) => {
    return borrow.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrow.memberName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Danh Sách Phiếu Mượn Đang Chờ</h1>

      {/* Thanh tìm kiếm */}
      <div className="flex justify-between mb-5">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={debouncedSearch}
          className="p-2 border rounded-md w-64"
        />
      </div>

      {/* Bảng dữ liệu */}
      <Table columns={columns} data={filteredBorrows} />

      {/* Modal xác nhận */}
      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <h3>
          {confirmAction.isAprove
            ? 'Bạn có chắc chắn muốn xác nhận phiếu mượn này?'
            : 'Bạn có chắc chắn muốn từ chối phiếu mượn này?'}
        </h3>
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={handleApprove}
            className={`${
              confirmAction.isAprove ? 'bg-green-500' : 'bg-yellow-500'
            } text-white px-4 py-2 rounded`}
          >
            {confirmAction.isAprove ? 'Xác nhận' : 'Từ chối'}
          </Button>
          <Button onClick={() => setShowConfirmModal(false)} className="bg-gray-300 px-4 py-2 rounded">
            Hủy
          </Button>
        </div>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <h3>Bạn có chắc chắn muốn xóa phiếu mượn này?</h3>
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={() => {
              toast.info('Chức năng xóa đang được xử lý!');
              setShowDeleteModal(false);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Xóa
          </Button>
          <Button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 px-4 py-2 rounded">
            Hủy
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PendingBorrowList;
