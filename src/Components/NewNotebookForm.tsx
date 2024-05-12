import { Button, TextField } from "@mui/material";
import "../styles/NewNotebookForm.css";
import { MuiColorInput } from "mui-color-input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNotebook } from "../redux/notebooksSlice";
import { Notebook } from "../redux/notebooksSlice";
import { v4 as uuidv4 } from "uuid";

interface NewNoteBookFormProps {
  createCallback: () => void;
}

export default function NewNoteBookForm(props: NewNoteBookFormProps) {
  const [nameInput, setNameInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const dispatch = useDispatch();
  const handleColorChange = (newColor: string) => {
    setColorInput(newColor);
  };
  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handleCreateNotebook = () => {
    const newNotebook: Notebook = {
      name: nameInput,
      color: colorInput,
      pages: [""],
      id: uuidv4(),
    };
    dispatch(createNotebook(newNotebook));
    props.createCallback();
  };

  return (
    <>
      <div id="notebook-form">
        <div id="form-header">
          <h2>New Notebook</h2>
        </div>
        <div id="form-content">
          <p>Name</p>
          <TextField label="Notebook Name" variant="filled" onChange={handleNameInput} value={nameInput} />
          <p>Color</p>

          <MuiColorInput format="hex" value={colorInput} onChange={handleColorChange}></MuiColorInput>

          <Button variant="contained" id="confirm-button" onClick={handleCreateNotebook}>
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
