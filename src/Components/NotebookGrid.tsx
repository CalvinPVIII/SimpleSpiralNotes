import { useSelector } from "react-redux";
import { allNotebooksSelector } from "../redux/store";
import "../styles/NotebookGrid.css";
import NotebookGridItem from "./NotebookGridItem";
import { useNavigate } from "react-router-dom";
export default function NotebookGrid() {
  const notebooks = useSelector(allNotebooksSelector);
  const nav = useNavigate();

  const handleNotebookClick = (notebookId: string) => {
    nav(`/notebook/${notebookId}`);
  };
  return (
    <>
      {Object.values(notebooks).length === 0 ? (
        <h2 id="empty-message">There are no notebooks</h2>
      ) : (
        <div id="notebook-grid">
          {Object.values(notebooks).map((notebook) => (
            <NotebookGridItem key={notebook.id} notebook={notebook} handleNotebookClick={handleNotebookClick} />
          ))}
        </div>
      )}
    </>
  );
}
