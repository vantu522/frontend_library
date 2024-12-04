import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBorrow, deleteBorrow, updateBorrow } from '../../../../redux/admin/borrowsReducer'; 
import { addToHistory } from '../../../../redux/admin/borrowHistoryReducer'; 
import Modal from '../../../../common/admin/Modal/Modal';
import Table from '../../../../common/admin/Table/Table';
import Button from '../../../../common/admin/Button/Button';
import Tooltip from '../../../../common/admin/Tooltip/Tooltip';
import { FaEdit, FaTrash, FaCheck, FaPlus } from 'react-icons/fa';  
import EditBorrowForm from '../EditBorrowForm/EditBorrowForm';
import AddBorrowForm from '../AddBorrowForm/AddBorrowForm';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  

const BorrowList = () => {
  const borrows = useSelector((state) => state.borrows);
  const readers = useSelector((state) => state.readers);
  const borrowHistory = useSelector((state) => state.borrowHistory); 
  const dispatch = useDispatch();
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [borrowId, setBorrowId] = useState(null);
  const [bookId, setBookId] = useState(null);  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [returnedBooks, setReturnedBooks] = useState(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);  // Lưu ID của phiếu mượn cần xóa

  const checkReaderExists = (borrowerName) => {
    return readers.some((reader) => reader.name.toLowerCase() === borrowerName.toLowerCase());
  };

  const filteredBorrows = borrows.filter((borrow) => {
    const matchesSearch = 
      (borrow.bookTitle && borrow.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (borrow.borrowerName && borrow.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || borrow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Hàm kiểm tra và cập nhật trạng thái quá hạn
  useEffect(() => {
    const today = new Date();
    borrows.forEach((borrow) => {
      const dueDate = new Date(borrow.dueDate);
      if (borrow.status === 'active') {
        if (today > dueDate) {
          const updatedBorrow = { ...borrow, status: 'overdue' };  // Đổi trạng thái thành 'overdue' nếu quá hạn
          dispatch(updateBorrow(updatedBorrow));
        } else {
          const updatedBorrow = { ...borrow, status: 'active' };  // Đảm bảo rằng trạng thái là 'active' nếu chưa quá hạn
          dispatch(updateBorrow(updatedBorrow));
        }
      }
    });
  }, [borrows, dispatch]);

  const columns = [
    { label: 'Tên sách', field: 'bookTitle' },
    { label: 'Tên người mượn', field: 'borrowerName' },
    { label: 'Email', field: 'borrowerEmail' },
    { label: 'Số điện thoại', field: 'borrowerPhone' },
    { label: 'Ngày mượn', field: 'borrowDate' },
    { label: 'Ngày trả dự kiến', field: 'dueDate' },
    {
      label: 'Trạng thái',
      field: 'status',
      render: (val, row) => (
        <span
          className={`font-bold ${row.status === 'overdue' ? 'text-red-500' : 'text-green-500'}`}
        >
          {row.status === 'overdue' ? 'Quá hạn' : 'Đang mượn'}
        </span>
      ),
    },
    {
      label: 'Hành động',
      width: 180,
      render: (val, row) => (
        <>
          <Tooltip content="Chỉnh sửa" position="left">
            <button
              onClick={() => {
                setVisibleForm(true);
                setIsEdit(true);
                setBorrowId(row.id);
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEdit size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Sau khi xóa, dữ liệu không thể khôi phục" position="left">
            <button
              onClick={() => {
                setDeleteTargetId(row.id);
                setShowDeleteModal(true);
              }}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              <FaTrash size={18} />
            </button>
          </Tooltip>

          {(row.status === 'active' || row.status === 'overdue') && !returnedBooks.has(row.id) && (
            <Tooltip content="Đánh dấu là đã trả và xóa" position="left">
              <button
                onClick={() => handleMarkAsReturned(row)}
                className="text-green-500 hover:text-green-700 ml-2"
              >
                <FaCheck size={18} />
              </button>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const handleDeleteConfirm = () => {
    dispatch(deleteBorrow(deleteTargetId));
    setShowDeleteModal(false);  // Đóng modal sau khi xóa
    toast.success('Phiếu mượn đã được xóa thành công.');
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);  // Đóng modal nếu hủy xóa
  };

  const handleMarkAsReturned = (row) => {
    if (returnedBooks.has(row.id)) return;

    const updatedBorrow = { ...row, status: 'returned' };
    dispatch(updateBorrow(updatedBorrow));

    dispatch(addToHistory({
      ...updatedBorrow,
      returnDate: new Date().toISOString().split('T')[0],
    }));

    setReturnedBooks((prevBooks) => {
      const updatedBooks = new Set(prevBooks);
      updatedBooks.add(row.id);
      return updatedBooks;
    });

    dispatch(deleteBorrow(row.id));

    // Hiển thị thông báo khi trả sách dù đã quá hạn
    if (row.status === 'overdue') {
      toast.warn(`Sách "${row.bookTitle}" đã quá hạn! Đánh dấu là đã trả dù quá hạn.`);
    }

    toast.success(`Phiếu mượn sách "${row.bookTitle}" đã được đánh dấu là đã trả và xóa khỏi danh sách.`);
  };

  const handleAddBorrow = (borrow) => {
    if (!checkReaderExists(borrow.borrowerName)) {
      alert('Người mượn chưa có trong danh sách bạn đọc, vui lòng thêm trước khi mượn sách.');
      return;
    }

    const borrowWithDate = {
      ...borrow,
      borrowDate: new Date().toISOString().split('T')[0],
    };

    dispatch(addBorrow(borrowWithDate));
  };

  return (
    <div className="p-5 font-sans">
      {/* Form Add Borrow */}
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditBorrowForm
            borrowId={borrowId}
            setVisibleForm={setVisibleForm}
            onUpdate={(borrow) => dispatch(updateBorrow(borrow))}
          />
        ) : (
          <AddBorrowForm
            setVisibleForm={setVisibleForm}
            onAdd={handleAddBorrow}
          />
        )}
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal onClose={handleDeleteCancel} isOpen={showDeleteModal}>
        <div className="text-center">
          <h3>Bạn có chắc chắn muốn xóa phiếu mượn này?</h3>
          <Button onClick={handleDeleteConfirm} className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md mt-2">
            Xóa
          </Button>

        </div>
      </Modal>

      <h1 className="text-2xl font-bold mb-4">Danh Sách Phiếu Mượn</h1>
      

      {/* Thanh tìm kiếm, trạng thái, và nút thêm */}
      <div className="flex justify-between items-center mb-5">
  {/* Thanh tìm kiếm bên trái */}
  <input
    type="text"
    placeholder="Tìm kiếm"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="p-2 border rounded-md w-64"
  />

  {/* Phần bên phải chứa nút thêm phiếu mượn và thanh lọc */}
  <div className="flex gap-3">
    {/* Thanh trạng thái lọc */}
    <select
      onChange={(e) => setStatusFilter(e.target.value)}
      value={statusFilter}
      className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value="all">Tất cả trạng thái</option>
      <option value="active">Đang mượn</option>
      <option value="returned">Đã trả</option>
      <option value="overdue">Quá hạn</option>
    </select>

    {/* Nút Thêm phiếu mượn */}
    <button
      onClick={() => {
        setVisibleForm(true);
        setIsEdit(false);
      }}
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
    >
      <FaPlus /> Thêm phiếu mượn
    </button>
  </div>
</div>


      {/* Bảng danh sách phiếu mượn */}
      <Table columns={columns} data={filteredBorrows} />
    </div>
  );
};

export default BorrowList;
