import "../styles/NotebookGridItem.css";

import { Notebook } from "../redux/notebooksSlice";

interface NotebookGridItemProps {
  notebook: Notebook;
  handleNotebookClick: (id: string) => void;
}

export default function NotebookGridItem(props: NotebookGridItemProps) {
  const onClickNotebook = () => {
    props.handleNotebookClick(props.notebook.id);
  };

  return (
    <div
      className="notebook-grid-item"
      style={{ backgroundColor: `${props.notebook.color}`, width: "300px", height: "400px" }}
      onClick={onClickNotebook}
    >
      <p>{props.notebook.name}</p>
    </div>
  );
}
