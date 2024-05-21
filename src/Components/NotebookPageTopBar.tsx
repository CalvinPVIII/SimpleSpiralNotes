import { Select, MenuItem, Button } from "@mui/material";
import { Notebook } from "../redux/notebooksSlice";
import "../styles/NotebookPageTopBar.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { addPageToNotebook, deleteNotebook } from "../redux/notebooksSlice";
interface NotebookPageTopBarProps {
  notebook: Notebook;
  currentPage: number;
  handleDeletePage: () => void;
}

export default function NotebookPageTopBar(props: NotebookPageTopBarProps) {
  const dispatch = useDispatch();

  const createPage = () => {
    dispatch(addPageToNotebook(props.notebook.id));
  };

  const deletePage = () => {
    props.handleDeletePage();
  };

  return (
    <div id="notebook-page-top-bar">
      <div id="notebook-page-top-bar-left"></div>
      <div id="notebook-page-top-bar-middle">{props.notebook.name}</div>
      <div id="notebook-page-top-bar-right">
        <Select value={props.currentPage} label={`${props.currentPage}/${props.notebook.pages.length}`}>
          {props.notebook.pages.map((page, index) => (
            <MenuItem value={index} key={index}>
              {index}
            </MenuItem>
          ))}
        </Select>
        <Button variant="text" onClick={createPage}>
          <AddIcon />
        </Button>

        <Button variant="text" onClick={deletePage}>
          <DeleteForeverIcon />
        </Button>
      </div>
    </div>
  );
}
