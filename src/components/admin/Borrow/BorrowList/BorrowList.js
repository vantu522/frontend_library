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
import "./BorrowList.css";

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

  useEffect(() => {
    const today = new Date();
    borrows.forEach((borrow) => {
      const dueDate = new Date(borrow.dueDate);
      if (borrow.status === 'active' && today > dueDate) {
        const updatedBorrow = { ...borrow, status: 'overdue' };
        dispatch(updateBorrow(updatedBorrow));
      }
    });
  }, [borrows, dispatch]);

  const columns = [
    { label: 'Tên sách', field: 'bookTitle' },
    { label: 'Tên người mượn', field: 'borrowerName' },
    { label: 'Email', field: 'borrowerEmail' },
    { label: 'Số điện thoại', field: 'borrowerEmail' },
    { label: 'Ngày mượn', field: 'borrowDate' },
    { label: 'Ngày trả dự kiến', field: 'dueDate' },
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
                setBookId(row.id); 
              }}
            >
              <FaEdit size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Sau khi xóa, dữ liệu không thể khôi phục" position="left">
            <Button
              onClick={() => dispatch(deleteBorrow(row.id))}
            >
              <FaTrash size={18}/>
            </Button>
          </Tooltip>

          {row.status === 'active' && !returnedBooks.has(row.id) && (  
            <Button
              onClick={() => {
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

                toast.success(`Phiếu mượn sách "${row.bookTitle}" đã được đánh dấu là đã trả và xóa khỏi danh sách.`);
              }}
              style={{ marginLeft: 8 }}
              size="small"
              className="success"
            >
              <FaCheck />
            </Button>
          )}
        </>
      ),
    },
  ];

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
    <div>
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

      <h1>Danh Sách Phiếu Mượn</h1>

      <div className="navigation">
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang mượn</option>
          <option value="returned">Đã trả</option>
          <option value="overdue">Quá hạn</option>
        </select>

        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button
          onClick={() => {
            setVisibleForm(true);
            setIsEdit(false);
          }}
          size="small"
          className="primary"
        >
          <FaPlus />
        </Button>
      </div>

      <Table columns={columns} data={filteredBorrows} />
    </div>
  );
};

export default BorrowList;
