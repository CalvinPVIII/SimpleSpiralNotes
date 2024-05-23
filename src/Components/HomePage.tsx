import { Modal } from "@mui/material";
import TopBar from "./TopBar";
import { useState } from "react";
import NewNoteBookForm from "./NewNotebookForm";
import NotebookGrid from "./NotebookGrid";
import "../styles/HomePage.css";
import { createNotebook, Notebook } from "../redux/notebooksSlice";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleCreateNotebook = (notebook: Notebook) => {
    dispatch(createNotebook(notebook));
    handleClose();
  };

  return (
    <>
      <TopBar handleOpenModal={handleOpen} />
      <div id="notebook-grid-wrapper">
        <NotebookGrid />
      </div>
      <Modal open={modalOpen} onClose={handleClose}>
        <NewNoteBookForm createCallback={handleCreateNotebook} pageHeader="New Notebook" buttonText="Create" />
      </Modal>
    </>
  );
}
