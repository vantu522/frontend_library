import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";
import Button from "../../../common/admin/Button/Button";
import { sendFeedback } from "../../../redux/admin/feedbackReducer";
import ratingService from "../../../services//admin/ratingService"; // Đảm bảo đã import ratingService

const FeedbackList = () => {
  const dispatch = useDispatch();
  const [visibleForm, setVisibleForm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [ratings, setRatings] = useState([]); // State để lưu đánh giá sách

  const feedbacks = useSelector((state) => state.feedbacks.feedbacks);
  const currentAdmin = useSelector((state) => state.auth?.adminName || "");

  // Call API lấy đánh giá khi component được mount
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const bookId = "book123"; // Giả sử bạn có bookId nào đó
        const ratingsData = await ratingService.fetchRatingsByBook(bookId); // Gọi API lấy đánh giá sách
        setRatings(ratingsData);
      } catch (error) {
        console.error("Lỗi khi lấy đánh giá sách:", error);
      }
    };

    fetchRatings();
  }, []); // Thêm useEffect để gọi API khi component load

  const filteredFeedbacks = feedbacks.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedFeedbacks = React.useMemo(() => {
    let sortableItems = [...filteredFeedbacks];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredFeedbacks, sortConfig]);

  const columns = [
    {
      label: "Họ Tên",
      field: "name",
      onClick: () => requestSort('name'),
    },
    {
      label: "Email",
      field: "email",
      onClick: () => requestSort('email'),
    },
    {
      label: "Câu Hỏi",
      field: "question",
      onClick: () => requestSort('question'),
    },
    {
      label: "Hành động",
      render: (val, row) => (
        <Button
          onClick={() => {
            setVisibleForm(true);
            setFeedback(row.feedback || "");
            setSelectedFeedbackId(row.id);
          }}
          size="small"
          className="primary bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
        >
          Gửi Phản Hồi
        </Button>
      ),
    },
  ];

  const handleSendFeedback = () => {
    if (feedback.trim() && selectedFeedbackId) {
      dispatch(
        sendFeedback({
          id: selectedFeedbackId,
          feedback,
          employee: currentAdmin,
        })
      );
      setVisibleForm(false);
      setFeedback("");
      setSelectedFeedbackId(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        <div className="flex flex-col space-y-4">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Nhập phản hồi của bạn"
            rows={5}
            className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleSendFeedback}
            className="primary bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            Gửi Phản Hồi
          </Button>
        </div>
      </Modal>

      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Danh Sách Phản Hồi</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Table columns={columns} data={sortedFeedbacks} />
    </div>
  );
};

export default FeedbackList;
