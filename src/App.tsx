import "./App.css";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotebookPage from "./Components/NotebookPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notebook/:id" element={<NotebookPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
