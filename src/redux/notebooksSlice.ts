import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notebook {
  name: string;
  id: string;
  color: string;
  pages: string[];
}

const initialState: { [key: string]: Notebook } = {};

export const notebookSlice = createSlice({
  name: "Notebooks",
  initialState,
  reducers: {
    createNotebook: (state, action: PayloadAction<Notebook>) => {
      state[action.payload.id] = action.payload;
    },
    deleteNotebook: (state, action: PayloadAction<Notebook>) => {
      delete state[action.payload.id];
    },
    addPageToNotebook: (state, action: PayloadAction<string>) => {
      state[action.payload].pages.push("");
    },
    deletePageFromNotebook: (state, action: PayloadAction<{ notebookId: string; pageIndex: number }>) => {
      state[action.payload.notebookId].pages.splice(action.payload.pageIndex, 1);
    },
  },
});

export const { createNotebook, deleteNotebook, addPageToNotebook, deletePageFromNotebook } = notebookSlice.actions;

export default notebookSlice.reducer;
