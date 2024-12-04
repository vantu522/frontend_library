import { createSlice } from "@reduxjs/toolkit";

const loadEmployeesFromLocalStorage = () => {
  const employees = localStorage.getItem("employees");
  return employees ? JSON.parse(employees) : [];
};

const initialState = loadEmployeesFromLocalStorage();

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("employees", JSON.stringify(state));
    },
    updateEmployee: (state, action) => {
      const index = state.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("employees", JSON.stringify(state));
      }
    },
    deleteEmployee: (state, action) => {
      const newState = state.filter((emp) => emp.id !== action.payload);
      localStorage.setItem("employees", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
