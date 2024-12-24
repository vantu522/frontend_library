import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";
import Tooltip from "../../../common/admin/Tooltip/Tooltip";
import Pagination from "../../../common/admin/Pagination";
import AddReaderForm from "./AddReaderForm";
import EditReaderForm from "./EditReaderForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faInfoCircle, faPlus, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import memberService from "../../../services/admin/memberService";
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';


const DeleteModal = ({ isOpen, onConfirm, onCancel }) => ( 
  <Modal onClose={onCancel} isOpen={isOpen}>
    <div className="p-6 text-center">
      <h3 className="text-lg font-semibold">Bạn có chắc chắn muốn xóa độc giả này?</h3>
      <div className="mt-4 space-x-4">
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Xóa
        </button>
      </div>
    </div>
  </Modal>
);


const InfoModal = ({ isOpen, onClose, selectedReader, borrowingInfo }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b pb-3 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">Thông Tin Sách Đang Mượn</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-150"
          >
          </button>
        </div>

        {selectedReader ? (
          borrowingInfo.borrowedAndRenewedBooks && borrowingInfo.borrowedAndRenewedBooks.length > 0 ? (
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">Thông tin độc giả</h3>
                <p><strong>Họ và tên:</strong> {borrowingInfo.memberName}</p>
                <p><strong>Số điện thoại:</strong> {borrowingInfo.phoneNumber}</p>
                <p><strong>Email:</strong> {borrowingInfo.email}</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-800">Sách đang mượn</h3>
                {borrowingInfo.borrowedAndRenewedBooks.map((book, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <p className="font-medium text-lg text-gray-800 mb-2">{book.bookTitle}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><strong>Ngày mượn:</strong> {book.transactionDate}</p>
                      <p><strong>Ngày trả dự kiến:</strong> {book.dueDate}</p>
                      <p>
                        <strong>Trạng thái:</strong>{" "}
                        <span className={`font-medium ${
                          book.status === "returned" ? "text-green-600" :
                          book.status === "overdue" ? "text-red-600" : "text-blue-600"
                        }`}>
                          {book.status === "returned"
                            ? "Đã trả"
                            : book.status === "overdue"
                            ? "Quá hạn"
                            : "Đang mượn"}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">Độc giả này hiện không mượn sách nào.</p>
          )
        ) : (
          <p className="text-gray-600 text-center py-8">Không có thông tin độc giả.</p>
        )}
      </div>
    </div>
  </Modal>
);



const ReaderList = () => {
  const reader = useSelector((state) => state.reader || []);
  const dispatch = useDispatch();
  const [readerData, setReaderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedReader, setSelectedReader] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [borrowingInfo, setBorrowingInfo] = useState([]);
  const [hiddenReaders, setHiddenReaders] = useState(new Set());
  const [showHidden, setShowHidden] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 17;

  
  useEffect(() => {
    const storedHiddenReaders = localStorage.getItem("hiddenReaders");
    if (storedHiddenReaders) {
      setHiddenReaders(new Set(JSON.parse(storedHiddenReaders)));
    }
  }, []);

  // Lưu trạng thái hiddenReaders vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("hiddenReaders", JSON.stringify(Array.from(hiddenReaders)));
  }, [hiddenReaders]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await memberService.fetchAllMember();
        setReaderData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (reader.length > 0) {
      setReaderData(reader);
    } else {
      fetchMembers();
    }
  }, []);

  // Filter readers based on search term
  const filteredReaders = readerData.filter((reader) => {
    const search = searchTerm.toLowerCase();
    const nameMatch = reader.name && reader.name.toLowerCase().includes(search);
    const emailMatch = reader.email && reader.email.toLowerCase().includes(search);
    const phoneMatch = reader.phoneNumber && reader.phoneNumber.toLowerCase().includes(search);
    const isVisible = showHidden || !hiddenReaders.has(reader.memberId);
    return (nameMatch || emailMatch || phoneMatch) && isVisible;
  });

  // Pagination
  const totalPages = Math.ceil(filteredReaders.length / itemsPerPage);
  const paginatedReaders = filteredReaders.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toggleReaderVisibility = (readerId) => {
    setHiddenReaders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(readerId)) {
        newSet.delete(readerId);
      } else {
        newSet.add(readerId);
      }
      return newSet;
    });
  };
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString(); // Trả về định dạng ngày (DD/MM/YYYY)
  };


  const columns = [
   
    { label: "Tên", field: "name", render: (val) => <span className="font-semibold">{val}</span>   },
    { label: "Email", field: "email",  },
    { label: "Địa Chỉ", field: "address",},
    { label: "Số Điện Thoại", field: "phoneNumber",},
    { label: "Đang mượn", field:"booksBorrowed"},
    {
      label: "Hành động",
      render: (val, row) => (
        <div className="flex gap-3 justify-center">
          <Tooltip content="Xem thông tin" position="left">
            <button
              onClick={() => {
                setSelectedReader(row);
                setInfoModalOpen(true);
                fetchBorrowingInfo(row.memberId);
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              <FontAwesomeIcon icon={faInfoCircle} size="lg" />
            </button>
          </Tooltip>
          <Tooltip content="Chỉnh sửa" position="left">
            <button
              onClick={() => {
                setVisibleForm(true);
                setIsEdit(true);
                setSelectedReader(row);
              }}
              className="text-yellow-500 hover:text-yellow-700"
            >
              <FontAwesomeIcon icon={faEdit} size="lg" />
            </button>
          </Tooltip>
          <Tooltip content="Xóa độc giả" position="left">
            <button
              onClick={() => {
                setDeleteTargetId(row.memberId);
                setDeleteModalOpen(true);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </button>
          </Tooltip>
        </div>
      ),
    },
    {
      label: "Ẩn/Hiện",
      render: (val, row) => (
        <Tooltip content={hiddenReaders.has(row.memberId) ? "Hiện" : "Ẩn"} position="left">
          <button
            onClick={() => toggleReaderVisibility(row.memberId)}
            className={`text-${hiddenReaders.has(row.memberId) ? 'green' : 'gray'}-500 hover:text-${hiddenReaders.has(row.memberId) ? 'green' : 'gray'}-700`}
          >
            <FontAwesomeIcon icon={hiddenReaders.has(row.memberId) ? faEye : faEyeSlash} size="lg" />
          </button>
        </Tooltip>
      ),
    },
  ]
  
  

  const fetchBorrowingInfo = async (memberId) => {
    try {
      const data = await memberService.fetchBorrowingMem(memberId);
      setBorrowingInfo(data);
      console.log("Borrowing info:", data);
    } catch (err) {
      console.error("Error fetching borrowing info:", err);
      // Handle error appropriately, maybe show a toast notification
    }
  };
  


  const handleDelete = async () => {
    try {
      await memberService.deleteMember(deleteTargetId);
      const updatedReaderData = readerData.filter((reader) => reader.memberId !== deleteTargetId);
      setReaderData(updatedReaderData);
      setDeleteModalOpen(false);
      toast.success("Xóa độc giả thành công!");
      
      if (paginatedReaders.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa độc giả!");
      console.error("Error deleting member:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Danh Sách Độc Giả</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm độc giả theo tên, email, số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
          <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-sm">
          <input
            type="checkbox"
            id="showHidden"
            checked={showHidden}
            onChange={(e) => setShowHidden(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
          <label htmlFor="showHidden" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
            Hiển thị độc giả đã ẩn
          </label>
        </div>
        <button
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setVisibleForm(true);
            setIsEdit(false);
            setSelectedReader(null);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Thêm Độc Giả
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen mt-[-150px] ">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2  border-gray-900"></div>
         <span className="ml-4 text-gray-700">Đang tải danh sách...</span>
       </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <Table columns={columns} data={paginatedReaders} />
          {filteredReaders.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditReaderForm
            reader={selectedReader}
            onClose={() => setVisibleForm(false)}
            onUpdate={(updatedReader) => {
              setReaderData((prev) =>
                prev.map((reader) =>
                  reader.memberId === updatedReader.memberId ? updatedReader : reader
                )
              );
              setVisibleForm(false);
            }}
          />
        ) : (
          <AddReaderForm
            onClose={() => setVisibleForm(false)}
            onAdd={(newReader) => {
              setReaderData((prev) => [...prev, newReader]);
            }}
          />
        )}
      </Modal>

      <InfoModal
        isOpen={infoModalOpen}
        onClose={() => {
          setInfoModalOpen(false);
          setBorrowingInfo([]); // Reset borrowing info khi đóng modal
        }}
        selectedReader={selectedReader}
        borrowingInfo={borrowingInfo}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ReaderList;

