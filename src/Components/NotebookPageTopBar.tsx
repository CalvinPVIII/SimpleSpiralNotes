import { Select, MenuItem, Button, Modal } from "@mui/material";
import { Notebook } from "../redux/notebooksSlice";
import "../styles/NotebookPageTopBar.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useDispatch } from "react-redux";
import { addPageToNotebook, deleteNotebook, editNotebook } from "../redux/notebooksSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NewNoteBookForm from "./NewNotebookForm";
interface NotebookPageTopBarProps {
  notebook: Notebook;
  currentPage: number;
  handleDeletePage: () => void;
  handleChangePage: (pageNum: number) => void;
}

export default function NotebookPageTopBar(props: NotebookPageTopBarProps) {
  const nav = useNavigate();
  const [deletePageModalOpen, setDeletePageModalOpenOpen] = useState(false);
  const handleDeletePageModelOpen = () => setDeletePageModalOpenOpen(true);
  const handleDeletePageModelClose = () => setDeletePageModalOpenOpen(false);

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const handleSettingsModalOpen = () => setSettingsModalOpen(true);
  const handleSettingsModalClose = () => setSettingsModalOpen(false);

  const [deleteNotebookModalOpen, setDeleteNotebookModalOpenOpen] = useState(false);
  const handleDeleteNotebookModelOpen = () => setDeleteNotebookModalOpenOpen(true);
  const handleDeleteNotebookModelClose = () => setDeleteNotebookModalOpenOpen(false);
  const dispatch = useDispatch();

  const createPage = () => {
    dispatch(addPageToNotebook(props.notebook.id));
  };

  const handleDeletePage = () => {
    props.handleDeletePage();
    handleDeletePageModelClose();
  };

  const handleDeleteNotebook = () => {
    dispatch(deleteNotebook(props.notebook));
    nav("/");
  };

  const handleEditoNotebook = (notebook: Notebook) => {
    dispatch(editNotebook(notebook));
    handleSettingsModalClose();
  };

  return (
    <>
      <Modal open={settingsModalOpen} onClose={handleSettingsModalClose}>
        <div className="settings-modal" id="settings-page-modal">
          <NewNoteBookForm
            createCallback={handleEditoNotebook}
            pageHeader="Edit Notebook"
            buttonText="Save"
            notebook={props.notebook}
            additionalOptions={
              <>
                <Button color="error" onClick={handleDeleteNotebookModelOpen}>
                  Delete Notebook
                </Button>
              </>
            }
          />
        </div>
      </Modal>
      <Modal open={deletePageModalOpen} onClose={handleDeletePageModelClose}>
        <div className="delete-modal" id="delete-page-modal">
          <div className="modal-header">
            <h2>ALERT</h2>
          </div>
          <p>Are you sure you want to delete this page?</p>
          <p>This action cannot be undone</p>
          <div>
            <Button color="success" variant="contained" onClick={handleDeletePage}>
              Confirm
            </Button>
            <Button color="error" variant="outlined" onClick={handleDeletePageModelClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      <Modal open={deleteNotebookModalOpen} onClose={handleDeleteNotebookModelClose}>
        <div className="delete-modal" id="delete-notebook-modal">
          <div className="modal-header">
            <h2>ALERT</h2>
          </div>
          <p>Are you sure you want to delete this Notebook?</p>
          <p>This action cannot be undone</p>
          <div>
            <Button color="success" variant="contained" onClick={handleDeleteNotebook}>
              Confirm
            </Button>
            <Button color="error" variant="outlined" onClick={handleDeleteNotebookModelClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      <div id="notebook-page-top-bar">
        <div id="notebook-page-top-bar-left">
          <Link to="/">
            <Button variant="text">
              <ArrowBackIcon />
            </Button>
          </Link>
          <Button variant="text" onClick={handleSettingsModalOpen}>
            <SettingsOutlinedIcon />
          </Button>
        </div>
        <div id="notebook-page-top-bar-middle">{props.notebook.name}</div>
        <div id="notebook-page-top-bar-right">
          <Select
            value={props.currentPage}
            label={`${props.currentPage}/${props.notebook.pages.length}`}
            onChange={(e) => props.handleChangePage(e.target.value as number)}
          >
            {props.notebook.pages.map((page, index) => (
              <MenuItem value={index} key={index}>
                {index}
              </MenuItem>
            ))}
          </Select>
          <Button variant="text" onClick={createPage}>
            <AddIcon />
          </Button>

          <Button variant="text" onClick={handleDeletePageModelOpen}>
            <DeleteForeverIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
