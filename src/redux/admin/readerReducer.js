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
      saveToLocalStorage(state);
    },
    deleteReader: (state, action) => {
      const updatedState = state.filter((reader) => reader.id !== action.payload);
      saveToLocalStorage(updatedState);
      return updatedState;
    },
    updateReader: (state, action) => {
      const index = state.findIndex((reader) => reader.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveToLocalStorage(state);
      }
    },
  },
});

export const { addReader, deleteReader, updateReader } = readersSlice.actions;
export default readersSlice.reducer;
