import { configureStore } from "@reduxjs/toolkit";
import editProjectReducer from './editProjectSlice'
import editTaskReducer from './editTaskSlice'

const store = configureStore({
  reducer: {
    editProject: editProjectReducer,
     editTask: editTaskReducer,
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
