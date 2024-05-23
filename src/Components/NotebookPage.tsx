import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allNotebooksSelector } from "../redux/store";
import NotePage from "./NotePage";
import NotebookPageTopBar from "./NotebookPageTopBar";
import { useState } from "react";
import { deletePageFromNotebook, addPageToNotebook, savePage } from "../redux/notebooksSlice";
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

  const changePage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleSavePage = (data: string) => {
    dispatch(savePage({ notebookId: notebook.id, pageIndex: currentPage, data: data }));
  };

  return (
    <>
      {notebook ? (
        <>
          <NotebookPageTopBar notebook={notebook} currentPage={currentPage} handleDeletePage={deletePage} handleChangePage={changePage} />
          <NotePage saveCallback={handleSavePage} pageData={notebook.pages[currentPage]} />
        </>
      ) : (
        <h1>Notebook not found</h1>
      )}
    </>
  );
}
