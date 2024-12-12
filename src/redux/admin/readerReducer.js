import { createSlice } from "@reduxjs/toolkit";

// Load state from Local Storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("readers");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Could not load state", error);
    return [];
  }
};

// Save state to Local Storage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("readers", serializedState);
  } catch (error) {
    console.error("Could not save state", error);
  }
};

const readersSlice = createSlice({
  name: "readers",
  initialState: loadFromLocalStorage(),
  reducers: {
    addReader: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state); // Cập nhật Local Storage
    },
    deleteReader: (state, action) => {
      const index = state.findIndex((reader) => reader.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1); // Xóa phần tử
        saveToLocalStorage(state); // Cập nhật Local Storage
      }
    },
    updateReader: (state, action) => {
      const index = state.findIndex((reader) => reader.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload; // Cập nhật phần tử
        saveToLocalStorage(state); // Cập nhật Local Storage
      }
    },
  },
});

export const { addReader, deleteReader, updateReader } = readersSlice.actions;
export default readersSlice.reducer;
