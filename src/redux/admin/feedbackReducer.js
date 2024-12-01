import { createSlice } from "@reduxjs/toolkit";


const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState: {
    feedbacks: [],
    archivedFeedbacks: [],
  },
  reducers: {
    sendFeedback: (state, action) => {

      state.feedbacks.push(action.payload);
    },
    archiveFeedback: (state, action) => {
 
      const feedbackIndex = state.feedbacks.findIndex(
        (feedback) => feedback.id === action.payload.id
      );
      if (feedbackIndex !== -1) {
        const [archivedFeedback] = state.feedbacks.splice(feedbackIndex, 1);
        state.archivedFeedbacks.push(archivedFeedback);
      }
    },
    removeFeedback: (state, action) => {

      state.feedbacks = state.feedbacks.filter(
        (feedback) => feedback.id !== action.payload.id
      );
    },
    removeArchivedFeedback: (state, action) => {

      state.archivedFeedbacks = state.archivedFeedbacks.filter(
        (feedback) => feedback.id !== action.payload.id
      );
    },
  },
});

export const {
  sendFeedback,
  archiveFeedback,
  removeFeedback,
  removeArchivedFeedback,
} = feedbackSlice.actions; 

export default feedbackSlice.reducer;
