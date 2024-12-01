import { createSlice } from "@reduxjs/toolkit";

const loadReadersFromLocalStorage = () => {
  try {
    const readers = localStorage.getItem("readers");
    return readers ? JSON.parse(readers) : [];
  } catch (error) {
    console.error("Lỗi khi tải độc giả từ localStorage:", error);
    return [];
  }
};

const saveReadersToLocalStorage = (readers) => {
  try {
    localStorage.setItem("readers", JSON.stringify(readers));
  } catch (error) {
    console.error("Lỗi khi lưu độc giả vào localStorage:", error);
  }
};

const readerSlice = createSlice({
  name: "readers",
  initialState: loadReadersFromLocalStorage() || [],
  reducers: {
    addReader: (state, action) => {
      state.push(action.payload);
      saveReadersToLocalStorage(state);
    },
    deleteReader: (state, action) => {
      const index = state.findIndex((reader) => reader.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        saveReadersToLocalStorage(state);
      }
    },
    updateReader: (state, action) => {
      const { id, name, email, phone } = action.payload;
      const reader = state.find((r) => r.id === id);
      if (reader) {
        reader.name = name;
        reader.email = email;
        reader.phone = phone;
        saveReadersToLocalStorage(state);
      }
    },
  },
});

export const { addReader, deleteReader, updateReader } = readerSlice.actions;
export default readerSlice.reducer;
