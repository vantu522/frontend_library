import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";
import Button from "../../../common/admin/Button/Button";
import Tooltip from "../../../common/admin/Tooltip/Tooltip";
import AddEmployeeForm from "./AddEmployeeForm";
import EditEmployeeForm from "./EditEmployeeForm";
import { deleteEmployee, updateEmployee, addEmployee } from "../../../redux/admin/employeesReducer"; // Cập nhật imports

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees); // Lấy danh sách nhân viên từ Redux store (thay đổi 'state.persons' thành 'state.employees')
  const dispatch = useDispatch();
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  
  // Xử lý trạng thái tìm kiếm và bộ lọc
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
        <>
          <Button
            onClick={() => {
              setVisibleForm(true);
              setIsEdit(true);
              setEmployeeId(row.id);
            }}
            size="small"
            className="primary"
          >
            Chỉnh sửa
          </Button>

          <Tooltip
            content={"Sau khi xóa, dữ liệu sẽ không thể khôi phục lại được"}
            position="left"
          >
            <Button
              onClick={() => dispatch(deleteEmployee(row.id))} 
              style={{ marginLeft: 8 }}
              size="small"
              className="danger"
            >
              Xóa
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div>
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditEmployeeForm
            employeeId={employeeId}
            setVisibleForm={setVisibleForm}
            onUpdate={(employee) => dispatch(updateEmployee(employee))} 
          />
        ) : (
          <AddEmployeeForm 
            setVisibleForm={setVisibleForm} 
            onAdd={(employee) => dispatch(addEmployee(employee))}
          />
        )}
      </Modal>
      <h1>Danh Sách Nhân Viên</h1>
      
      <div className="navigation">
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
          }}
        >
          Thêm Nhân Viên
        </Button>
      </div>
      
      <Table columns={columns} data={filteredEmployees} />
    </div>
  );
};

export default EmployeeList;
