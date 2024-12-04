import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../../common/admin/Button/Button";

const EditEmployeeForm = ({ employeeId, onUpdate, onClose }) => {
  const [employee, setEmployee] = useState(null);

  // Lấy dữ liệu nhân viên từ Redux
  const employees = useSelector((state) => state.employees);
  const currentEmployee = employees.find((emp) => emp.id === employeeId);

  useEffect(() => {
    if (currentEmployee) {
      setEmployee(currentEmployee);
    }
  }, [currentEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee) {
      onUpdate(employee);
      onClose();
    }
  };

  if (!employee) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Chỉnh Sửa Nhân Viên</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Tên:</label>
          <input
            type="text"
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Chức Vụ:</label>
          <input
            type="text"
            value={employee.position}
            onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Số Điện Thoại:</label>
          <input
            type="text"
            value={employee.phone}
            onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4 mt-6">
          <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Lưu
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
