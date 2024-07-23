import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userTable: [],
};

const table = createSlice({
  name: "table",
  initialState,
  reducers: {
    add: (state, action) => {
      state.userTable.push(action.payload);
    },
    edt: (state, action) => {
      state.userTable.push(action.payload);
    },
    dlt: (state, action) => {
      state.userTable.splice(action.payload, 1);
    },
  },
});

export const { add, edt, dlt } = table.actions;
export default table.reducer;
