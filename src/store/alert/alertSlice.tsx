import { createSlice } from "@reduxjs/toolkit";

// interface
interface AlertStateI {
  errorMessage: string;
  successMessage: string;
}

const initialState: AlertStateI = {
  successMessage: "",
  errorMessage: "",
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    successMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    errorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { successMessage, errorMessage } = alertsSlice.actions;

export default alertsSlice.reducer;
