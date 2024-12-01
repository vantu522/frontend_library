import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";
import Tooltip from "../../../common/admin/Tooltip/Tooltip";
import AddReaderForm from "./AddReaderForm";
import EditReaderForm from "./EditReaderForm";
import { deleteReader, updateReader, addReader } from "../../../redux/admin/readerReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const ReaderList = () => {
  const readers = useSelector((state) => state.readers || []);
  const dispatch = useDispatch();
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [readerId, setReaderId] = useState(null);
  const [selectedReader, setSelectedReader] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReaders = Array.isArray(readers)
    ? readers.filter((reader) =>
        reader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reader.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const columns = [
    { label: "Tên", field: "name" },
    { label: "Email", field: "email" },
    { label: "Địa Chỉ", field: "address" },
    { label: "Số Điện Thoại", field: "phone" },
    {
      label: "Hành động",
      width: 130,
      render: (val, row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <FontAwesomeIcon
            icon={faEdit}
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={() => {
              setVisibleForm(true);
              setIsEdit(true);
              setReaderId(row.id);
            }}
          />
          <Tooltip content={"Sau khi xóa, dữ liệu sẽ không thể khôi phục lại được"} position="left">
            <FontAwesomeIcon
              icon={faTrash}
              style={{ cursor: "pointer", color: "#dc3545" }}
              onClick={() => dispatch(deleteReader(row.id))}
            />
          </Tooltip>
          <FontAwesomeIcon
            icon={faInfoCircle}
            style={{ cursor: "pointer", color: "#17a2b8" }}
            onClick={() => {
              setSelectedReader(row);
              setInfoModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditReaderForm
            readerId={readerId}
            setVisibleForm={setVisibleForm}
            onUpdate={(reader) => dispatch(updateReader(reader))}
          />
        ) : (
          <AddReaderForm
            setVisibleForm={setVisibleForm}
            onAdd={(reader) => dispatch(addReader(reader))}
          />
        )}
      </Modal>

      <Modal onClose={() => setInfoModalOpen(false)} isOpen={infoModalOpen}>
        <h2>Thông Tin Sách Đang Mượn</h2>
        {selectedReader ? (
          <ul>
            {selectedReader.borrowedBooks && selectedReader.borrowedBooks.length > 0 ? (
              selectedReader.borrowedBooks.map((book, index) => (
                <li key={index}>
                  <strong>{book.title}</strong> - Ngày mượn: {book.borrowDate}
                </li>
              ))
            ) : (
              <p>Độc giả này không mượn sách nào.</p>
            )}
          </ul>
        ) : (
          <p>Không có thông tin.</p>
        )}
      </Modal>

      <h1>Danh Sách Độc Giả</h1>
      <div className="navigation">
        <button
          style={{ marginBottom: 8 }}
          onClick={() => {
            setVisibleForm(true);
            setIsEdit(false);
          }}
        >
          Thêm Độc Giả
        </button>
      </div>
      <Table columns={columns} data={filteredReaders} />
    </div>
  );
};

export default ReaderList;
