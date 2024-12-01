import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";
import Button from "../../../common/admin/Button/Button";
import { sendFeedback } from "../../../redux/admin/feedbackReducer";

const FeedbackList = () => {
  const dispatch = useDispatch();
  const [visibleForm, setVisibleForm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' }); 

  const feedbacks = useSelector((state) => state.feedbacks.feedbacks);
  const currentAdmin = useSelector((state) => state.auth?.adminName || ""); 


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
          className="primary"
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
    <div>
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Nhập phản hồi của bạn"
          rows={5}
        />
        <Button onClick={handleSendFeedback} className="primary">
          Gửi Phản Hồi
        </Button>
      </Modal>

      <h1>Danh Sách Phản Hồi</h1>
      <Table
        columns={columns}
        data={sortedFeedbacks} 
      />
    </div>
  );
};

export default FeedbackList;
