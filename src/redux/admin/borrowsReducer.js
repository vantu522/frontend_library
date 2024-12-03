import { createSlice } from "@reduxjs/toolkit";

const loadBorrowsFromLocalStorage = () => {
  try {
    const borrows = localStorage.getItem("borrows");
    return borrows ? JSON.parse(borrows) : [];
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ localStorage:", error);
    return [];
  }
};

const saveBorrowsToLocalStorage = (borrows) => {
  try {
    localStorage.setItem("borrows", JSON.stringify(borrows));
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu vào localStorage:", error);
  }
};

const borrowsSlice = createSlice({
  name: "borrows",
  initialState: loadBorrowsFromLocalStorage(),
  reducers: {
    addBorrow: (state, action) => {
      const updatedState = [...state, action.payload];
      saveBorrowsToLocalStorage(updatedState);
      return updatedState;
    },
    deleteBorrow: (state, action) => {
      const updatedState = state.filter((borrow) => borrow.id !== action.payload);
      saveBorrowsToLocalStorage(updatedState);
      return updatedState;
    },
    updateBorrow: (state, action) => {
      const { id, bookId, borrowerName, borrowerPhone, borrowerEmail, borrowDate, dueDate, status } = action.payload;
      const updatedState = state.map((borrow) =>
        borrow.id === id
          ? { ...borrow, bookId, borrowerName, borrowerPhone, borrowerEmail, borrowDate, dueDate, status }
          : borrow
      );
      saveBorrowsToLocalStorage(updatedState);
      return updatedState;
    },
    markAsReturned: (state, action) => {
      const updatedState = state.map((borrow) =>
        borrow.id === action.payload
          ? { ...borrow, status: "returned" } // Đánh dấu đã trả sách
          : borrow
      );
      saveBorrowsToLocalStorage(updatedState);
      return updatedState;
    },
    markAsOverdue: (state, action) => {
      const updatedState = state.map((borrow) =>
        borrow.id === action.payload
          ? { ...borrow, status: "overdue" } // Đánh dấu sách quá hạn
          : borrow
      );
      saveBorrowsToLocalStorage(updatedState);
      return updatedState;
    },
  },
});

export const { addBorrow, deleteBorrow, updateBorrow, markAsReturned, markAsOverdue } = borrowsSlice.actions;
export default borrowsSlice.reducer;
