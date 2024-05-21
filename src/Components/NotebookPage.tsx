import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allNotebooksSelector } from "../redux/store";
import NotePage from "./NotePage";
import NotebookPageTopBar from "./NotebookPageTopBar";
import { useState } from "react";
import { deletePageFromNotebook, addPageToNotebook } from "../redux/notebooksSlice";
export default function NotebookPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { id } = useParams();
  const notebook = useSelector(allNotebooksSelector)[id as string];
  const dispatch = useDispatch();

  const deletePage = () => {
    dispatch(deletePageFromNotebook({ notebookId: notebook.id, pageIndex: currentPage }));

    // if you deleted the last page, make a new blank one
    if (currentPage === 0 && notebook.pages.length === 1) {
      dispatch(addPageToNotebook(notebook.id));
    } else if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {notebook ? (
        <>
          <NotebookPageTopBar notebook={notebook} currentPage={currentPage} handleDeletePage={deletePage} />
          <NotePage />
        </>
      ) : (
        <h1>Notebook not found</h1>
      )}
    </>
  );
}
