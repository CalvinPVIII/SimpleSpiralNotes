import { configureStore } from "@reduxjs/toolkit";
import notebookReducer, { Notebook } from "./notebooksSlice";
export default configureStore({
  reducer: {
    notebooks: notebookReducer,
  },
});

interface AppState {
  notebooks: { [id: string]: Notebook };
}

export const allNotebooksSelector = (state: AppState) => state.notebooks;
