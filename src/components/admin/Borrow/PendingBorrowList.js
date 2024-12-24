import React, { useState, useEffect } from "react";
import borrowService from "../../../services/admin/borrowService";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";
import Button from "../../../common/admin/Button/Button";
import Tooltip from "../../../common/admin/Tooltip/Tooltip";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash.debounce";

const PendingBorrowList = () => {
  const [borrows, setBorrows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState({});
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [loading, setLoading] = useState(false);  // Loading state

  useEffect(() => {
    fetchPendingBorrowList();
  }, []);

  const fetchPendingBorrowList = async () => {
    setLoading(true);  // Set loading to true before the API call
    try {
      const data = await borrowService.fetchAllPending();
      setBorrows(data);
    } catch (error) {
      toast.error("Không thể tải danh sách phiếu mượn đang chờ");
    } finally {
      setLoading(false);  // Set loading to false after the API call completes
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

      setShowConfirmModal(false);
      await fetchPendingBorrowList();
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái phiếu mượn.");
    }
  };

  // Hàm tìm kiếm với debounce
  const handleSearch = debounce((e) => {
    setSearchTerm(e.target.value);
  }, 500);

  const filteredBorrows = borrows.filter((borrow) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      borrow.bookTitle.toLowerCase().includes(searchLower) ||
      borrow.memberName.toLowerCase().includes(searchLower) ||
      borrow.phoneNumber.includes(searchLower)
    );
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString(); // Trả về định dạng ngày (DD/MM/YYYY)
  };

  const columns = [
    { label: "Tên người mượn", field: "memberName" },
    { label: "Tên sách", field: "bookTitle", render: (val) => <span className="font-semibold">{val}</span> },
    { label: "Số điện thoại", field: "phoneNumber" },
    { label: "Ngày mượn", field: "transactionDate", render:(val) => formatDate(val) },
    { label: "Ngày trả", field: "dueDate", render:(val) => formatDate(val) },
    {
      label: "Trạng thái",
      render: (val, row) => {
        return (
          <span
            className={`font-bold ${
              val?.status === "Đang chờ"
                ? "text-red-500"
                : val?.status === "Đã duyệt"
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            {row.status || "Không xác định"}
          </span>
        );
      },
    },
    {
      label: "Hành động",
      render: (val, row) => (
        <div className="flex justify-center">
          {row.status === "Đang chờ" && (
            <>
              <Tooltip content="Xác nhận">
                <button
                  onClick={() => {
                    setConfirmAction({ borrow: row, isAprove: true });
                    setShowConfirmModal(true);
                  }}
                  className="text-green-500 hover:text-green-700 mr-2"
                >
                  <FaCheckCircle size={25} />
                </button>
              </Tooltip>
              <Tooltip content="Từ chối">
                <button
                  onClick={() => {
                    setConfirmAction({ borrow: row, isAprove: false });
                    setShowConfirmModal(true);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaExclamationTriangle size={25} />
                </button>
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Danh Sách Phiếu Mượn Đang Chờ</h1>

      {/* Thanh tìm kiếm */}
      <div className="flex justify-between mb-5">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
          onChange={(e) => handleSearch(e)}
          className="p-2 border rounded-md w-64"
        />
      </div>

      {/* Hiển thị loading */}
      {loading ? (
        <div className="text-center text-lg">Đang tải dữ liệu...</div>
      ) : (
        <Table columns={columns} data={filteredBorrows} />
      )}

      {/* Modal xác nhận */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      >
        <h3>
          {confirmAction.isAprove
            ? "Bạn có chắc chắn muốn xác nhận phiếu mượn này?"
            : "Bạn có chắc chắn muốn từ chối phiếu mượn này?"}
        </h3>
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={handleApprove}
            className={`${
              confirmAction.isAprove ? "bg-green-500" : "bg-red-500"
            } text-white px-5 py-2 text-lg rounded`}
          >
            {confirmAction.isAprove ? "Xác nhận" : "Từ chối"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PendingBorrowList;
