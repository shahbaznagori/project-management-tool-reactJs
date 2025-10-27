import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "editTask",
  initialState: {
    task: null,
  },
  reducers: {
    setTask: (state, action) => {
      console.log("SET TASK", action.payload);
      state.task = action.payload;
    },
    clearTask: (state) => {
      state.task = null;
    },
  },
});

export const { setTask, clearTask } = taskSlice.actions;
export default taskSlice.reducer;
