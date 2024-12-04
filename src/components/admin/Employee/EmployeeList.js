import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";
import Tooltip from "../../../common/admin/Tooltip/Tooltip";
import AddEmployeeForm from "./AddEmployeeForm";
import EditEmployeeForm from "./EditEmployeeForm";
import { deleteEmployee, updateEmployee, addEmployee } from "../../../redux/admin/employeesReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
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
    { label: "Mã Nhân Viên", field: "id", width: "15%" },
    { label: "Tên", field: "name", width: "25%" },
    { label: "Chức Vụ", field: "position", width: "20%" },
    { label: "Số Điện Thoại", field: "phone", width: "20%" },
    { label: "Email", field: "email", width: "20%" },
    {
      label: "Hành động",
      width: "10%",
      render: (val, row) => (
        <div className="flex gap-2">
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
              <FontAwesomeIcon icon={faEdit} size="lg" className="text-blue-500" />
            </button>
          </Tooltip>

          {/* Xóa */}
          <Tooltip content="Xóa nhân viên" position="left">
            <button
              className="icon-btn"
              onClick={() => dispatch(deleteEmployee(row.id))}
            >
              <FontAwesomeIcon icon={faTrash} size="lg" className="text-red-500" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Modal cho thêm và chỉnh sửa nhân viên */}
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditEmployeeForm
            employeeId={selectedEmployee?.id}
            onClose={() => setVisibleForm(false)}
            onUpdate={(employee) => dispatch(updateEmployee(employee))}
          />
        ) : (
          <AddEmployeeForm
            setVisibleForm={setVisibleForm} // Ensure this is passed correctly
            onAdd={(employee) => dispatch(addEmployee(employee))}
          />
        )}
      </Modal>

      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Danh Sách Nhân Viên</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            onChange={(e) => setPositionFilter(e.target.value)}
            value={positionFilter}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả chức vụ</option>
            <option value="manager">Quản lý</option>
            <option value="staff">Nhân viên</option>
          </select>
        </div>

        <button
          onClick={() => {
            setVisibleForm(true);
            setIsEdit(false);
            setSelectedEmployee(null);
          }}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          <FontAwesomeIcon icon={faPlus} />
          Thêm Nhân Viên
        </button>
      </div>

      <Table columns={columns} data={filteredEmployees} />
    </div>
  );
};

export default EmployeeList;
