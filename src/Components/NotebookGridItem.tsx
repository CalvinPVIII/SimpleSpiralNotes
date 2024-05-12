import "../styles/NotebookGridItem.css";

import { Notebook } from "../redux/notebooksSlice";

interface NotebookGridItemProps {
  notebook: Notebook;
}

export default function NotebookGridItem(props: NotebookGridItemProps) {
  return (
    <div className="notebook-grid-item" style={{ backgroundColor: `${props.notebook.color}`, width: "300px", height: "400px" }}>
      <p>{props.notebook.name}</p>
    </div>
  );
}
