import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from "react";
import { fabric } from "fabric";
export default function NotePage() {
  const { editor, onReady } = useFabricJSEditor();
  const history = [];
  useEffect(() => {
    if (!editor) return;
    editor.canvas.setHeight(20000);
    editor.canvas.isDrawingMode = true;
  }, [editor]);

  const togglePenMode = () => {
    if (!editor) return;
    editor.canvas.freeDrawingBrush = new fabric.BaseBrush();
    editor.canvas.isDrawingMode = true;
    editor.canvas.freeDrawingBrush.color = "rgba(0, 0, 0, 1)";
    editor.canvas.freeDrawingBrush.width = 1;
  };

  const toggleHighlighter = () => {
    if (!editor) return;
    editor.canvas.freeDrawingBrush.color = "rgba(255, 251, 0, 0.32)";
    editor.canvas.freeDrawingBrush.width = 20;
  };

  const changeColor = () => {
    if (!editor) return;
    editor.setStrokeColor("rgba(255, 0, 0, 1)");
  };

  const toggleSelect = () => {
    if (!editor) return;
    editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
    console.log(editor.canvas);
  };

  const undo = () => {
    if (!editor) return;
    if (editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop());
    }
    editor.canvas.renderAll();
  };

  const redo = () => {
    if (!editor) return;
    if (history.length > 0) {
      editor.canvas.add(history.pop());
    }
  };

  const eraserMode = () => {
    if (!editor) return;
    editor.canvas.freeDrawingBrush = new fabric.EraserBrush(editor.canvas);
    editor.canvas.freeDrawingBrush.width = 20;
  };

  return (
    <>
      <button onClick={togglePenMode}>add pen</button>
      <button onClick={toggleHighlighter}>highlighter</button>
      <button onClick={toggleSelect}>Toggle Select</button>
      <button onClick={changeColor}>ChangeColor</button>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
      <button onClick={eraserMode}>erase</button>

      <div style={{ width: "100vw", height: "50vh" }}>
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      </div>
    </>
  );
}
