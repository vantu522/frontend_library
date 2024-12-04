import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";
import Button from "../../../common/admin/Button/Button";
import Tooltip from "../../../common/admin/Tooltip/Tooltip";
import AddEmployeeForm from "./AddEmployeeForm";
import EditEmployeeForm from "./EditEmployeeForm";
import { deleteEmployee, updateEmployee, addEmployee } from "../../../redux/admin/employeesReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Gộp ID và thông tin nhân viên
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');

  // Xử lý tìm kiếm và bộ lọc
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'all' || employee.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  const columns = [
    { label: "Tên", field: "name" },
    { label: "Chức Vụ", field: "position" },
    { label: "Số Điện Thoại", field: "phone" },
    { label: "Email", field: "email" },
    {
      label: "Hành động",
      width: 130,
      render: (val, row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {/* Chỉnh sửa */}
          <Tooltip content="Chỉnh sửa" position="left">
            <button
              className="icon-btn"
              onClick={() => {
                setVisibleForm(true);
                setIsEdit(true);
                setSelectedEmployee(row);
              }}
            >
              <FontAwesomeIcon icon={faEdit} size="lg" color="#007bff" />
            </button>
          </Tooltip>

          {/* Xóa */}
          <Tooltip content="Xóa nhân viên" position="left">
            <button
              className="icon-btn"
              onClick={() => dispatch(deleteEmployee(row.id))}
            >
              <FontAwesomeIcon icon={faTrash} size="lg" color="#ff4d4f" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditEmployeeForm
            employee={selectedEmployee}
            onClose={() => setVisibleForm(false)}
            onUpdate={(employee) => dispatch(updateEmployee(employee))}
          />
        ) : (
          <AddEmployeeForm
            onClose={() => setVisibleForm(false)}
            onAdd={(employee) => dispatch(addEmployee(employee))}
          />
        )}
      </Modal>

      <h1>Danh Sách Nhân Viên</h1>

      <div className="navigation">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setPositionFilter(e.target.value)} value={positionFilter}>
          <option value="all">Tất cả chức vụ</option>
          <option value="manager">Quản lý</option>
          <option value="staff">Nhân viên</option>
        </select>
        <Button
          style={{ marginBottom: 8 }}
          size="medium"
          onClick={() => {
            setVisibleForm(true);
            setIsEdit(false);
            setSelectedEmployee(null);
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
          Thêm Nhân Viên
        </Button>
      </div>

      <Table columns={columns} data={filteredEmployees} />
    </div>
  );
};

export default EmployeeList;
