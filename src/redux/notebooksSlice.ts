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
  },
});

export const { createNotebook, deleteNotebook } = notebookSlice.actions;

export default notebookSlice.reducer;
