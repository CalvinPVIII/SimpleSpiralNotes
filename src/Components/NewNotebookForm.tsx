import { Button, TextField } from "@mui/material";
import "../styles/NewNotebookForm.css";
import { MuiColorInput } from "mui-color-input";
import { useState } from "react";
import { Notebook } from "../redux/notebooksSlice";
import { v4 as uuidv4 } from "uuid";

interface NewNoteBookFormProps {
  createCallback: (notebook: Notebook) => void;
  pageHeader: string;
  notebook?: Notebook;
  additionalOptions?: React.ReactNode;
  buttonText: string;
}

export default function NewNoteBookForm(props: NewNoteBookFormProps) {
  const [nameInput, setNameInput] = useState(props.notebook ? props.notebook.name : "");
  const [colorInput, setColorInput] = useState(props.notebook ? props.notebook.color : "");
  const handleColorChange = (newColor: string) => {
    setColorInput(newColor);
  };
  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handleCreateNotebook = () => {
    if (props.notebook) {
      const newNotebook: Notebook = {
        name: nameInput,
        color: colorInput,
        pages: props.notebook.pages,
        id: props.notebook.id,
      };
      props.createCallback(newNotebook);
    } else {
      const newNotebook: Notebook = {
        name: nameInput,
        color: colorInput,
        pages: [""],
        id: uuidv4(),
      };
      props.createCallback(newNotebook);
    }
  };

  return (
    <>
      <div id="notebook-form">
        <div id="form-header">
          <h2>{props.pageHeader}</h2>
        </div>
        <div id="form-content">
          <p>Name</p>
          <TextField label="Notebook Name" variant="filled" onChange={handleNameInput} value={nameInput} />
          <p>Color</p>

          <MuiColorInput format="hex" value={colorInput} onChange={handleColorChange}></MuiColorInput>

          <Button variant="contained" id="confirm-button" onClick={handleCreateNotebook}>
            {props.buttonText}
          </Button>
          {props.additionalOptions}
        </div>
      </div>
    </>
  );
}
