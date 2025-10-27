import {createSlice} from "@reduxjs/toolkit"

const editProjectSlice = createSlice(
    {
  name: "editProject",
  initialState: {
    project: null, 
  },
reducers: {
    setProject: (state, action) => {
      console.log("SET PRO", action.payload);

      state.project = action.payload;
    },
    clearProject: (state) => {
      state.project = null;
    },
  },  }

  
  
)

export const {setProject , clearProject} = editProjectSlice.actions;
export default editProjectSlice.reducer;