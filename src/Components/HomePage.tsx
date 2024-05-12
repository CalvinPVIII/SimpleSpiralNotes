import { Modal } from "@mui/material";
import TopBar from "./TopBar";
import { useState } from "react";
import NewNoteBookForm from "./NewNotebookForm";
import NotebookGrid from "./NotebookGrid";
import "../styles/HomePage.css";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <>
      <TopBar handleOpenModal={handleOpen} />
      <div id="notebook-grid-wrapper">
        <NotebookGrid />
      </div>
      <Modal open={modalOpen} onClose={handleClose}>
        <NewNoteBookForm createCallback={handleClose} />
      </Modal>
    </>
  );
}
