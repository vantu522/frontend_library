
import { createSlice } from "@reduxjs/toolkit";


const loadEmployeesFromLocalStorage = () => {
  const employees = localStorage.getItem("employees");
  return employees ? JSON.parse(employees) : [];
};


const saveEmployeesToLocalStorage = (employees) => {
  localStorage.setItem("employees", JSON.stringify(employees));
};

const employeesSlice = createSlice({
  name: "employees",
  initialState: loadEmployeesFromLocalStorage(), 
  reducers: {
    addEmployee: (state, action) => {
      const updatedState = [...state, action.payload];
      saveEmployeesToLocalStorage(updatedState); 
      return updatedState;
    },
    deleteEmployee: (state, action) => {
      const updatedState = state.filter((employee) => employee.id !== action.payload);
      saveEmployeesToLocalStorage(updatedState); 
      return updatedState;
    },
    updateEmployee: (state, action) => {
      const { id, name, position, email, phone } = action.payload;
      const updatedState = state.map((employee) =>
        employee.id === id
          ? { ...employee, name, position, email, phone }
          : employee
      );
      saveEmployeesToLocalStorage(updatedState); 
      return updatedState;
    },
  },
});

export const { addEmployee, deleteEmployee, updateEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
