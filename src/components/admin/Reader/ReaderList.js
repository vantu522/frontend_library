import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";
import Tooltip from "../../../common/admin/Tooltip/Tooltip";
import AddReaderForm from "./AddReaderForm";
import EditReaderForm from "./EditReaderForm";
import { deleteReader, updateReader, addReader } from "../../../redux/admin/readerReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";

// Component DeleteModal
const DeleteModal = ({ isOpen, onConfirm, onCancel }) => (
  <Modal onClose={onCancel} isOpen={isOpen}>
    <div className="delete-modal">
      <h3>Bạn có chắc chắn muốn xóa độc giả này?</h3>
      <button onClick={onConfirm} className="btn primary">
        Xóa
      </button>
      <button onClick={onCancel} className="btn secondary">
        Hủy
      </button>
    </div>
  </Modal>
);

// Component InfoModal
const InfoModal = ({ isOpen, onClose, selectedReader }) => (
  <Modal onClose={onClose} isOpen={isOpen}>
    <div>
      <h2>Thông Tin Sách Đang Mượn</h2>
      {selectedReader ? (
        <>
          {selectedReader.borrowedBooks && selectedReader.borrowedBooks.length > 0 ? (
            <ul>
              {selectedReader.borrowedBooks.map((book, index) => (
                <li key={index}>
                  <p><strong>Tựa sách:</strong> {book.title}</p>
                  <p><strong>Ngày mượn:</strong> {book.borrowDate}</p>
                  <p><strong>Ngày trả dự kiến:</strong> {book.dueDate}</p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    {book.status === "returned"
                      ? "Đã trả"
                      : book.status === "overdue"
                      ? "Quá hạn"
                      : "Đang mượn"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Độc giả này hiện không mượn sách nào.</p>
          )}
        </>
      ) : (
        <p>Không có thông tin độc giả.</p>
      )}
      <button onClick={onClose} className="btn secondary">
        Đóng
      </button>
    </div>
  </Modal>
);

const ReaderList = () => {
  const readers = useSelector((state) => state.readers || []);
  const dispatch = useDispatch();

  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedReader, setSelectedReader] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc độc giả theo từ khóa tìm kiếm
  const filteredReaders = readers.filter((reader) =>
    reader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reader.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { label: "Tên", field: "name" },
    { label: "Email", field: "email" },
    { label: "Địa Chỉ", field: "address" },
    { label: "Số Điện Thoại", field: "phone" },
    {
      label: "Hành động",
      render: (val, row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Tooltip content="Xem thông tin" position="left">
            <button
              onClick={() => {
                setSelectedReader(row);
                setInfoModalOpen(true);
              }}
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
            >
              <FontAwesomeIcon icon={faEdit} size="lg" />
            </button>
          </Tooltip>

          <Tooltip content="Xóa độc giả" position="left">
            <button
              onClick={() => {
                setDeleteTargetId(row.id);
                setDeleteModalOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    dispatch(deleteReader(deleteTargetId));
    setDeleteModalOpen(false);
  };

  return (
    <div>
      <h1>Danh Sách Độc Giả</h1>

      {/* Thanh tìm kiếm */}
      <div className="navigation">
        <input
          type="text"
          placeholder="Tìm kiếm độc giả..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn primary"
          onClick={() => {
            setVisibleForm(true);
            setIsEdit(false);
            setSelectedReader(null);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Thêm Độc Giả
        </button>
      </div>

      {/* Bảng danh sách độc giả */}
      <Table columns={columns} data={filteredReaders} />

      {/* Modal Thêm/Sửa Độc Giả */}
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditReaderForm
            reader={selectedReader}
            onClose={() => setVisibleForm(false)}
            onUpdate={(reader) => dispatch(updateReader(reader))}
          />
        ) : (
          <AddReaderForm
            onClose={() => setVisibleForm(false)}
            onAdd={(reader) => dispatch(addReader(reader))}
          />
        )}
      </Modal>

      {/* Modal Xem Thông Tin */}
      <InfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        selectedReader={selectedReader}
      />

      {/* Modal Xóa */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ReaderList;
