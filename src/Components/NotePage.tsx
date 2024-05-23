import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { BaseBrush } from "fabric/fabric-impl";
import "../styles/NotePage.css";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

interface NotePageProps {
  saveCallback: (data: string) => void;
  pageData: string;
}

export default function NotePage(props: NotePageProps) {
  const { editor, onReady } = useFabricJSEditor();

  const increaseCanvasHeight = () => {
    if (!editor) return;
    if (!editor.canvas.height) return;
    editor.canvas.setHeight(editor.canvas.height + 1000);
  };

  useBottomScrollListener(increaseCanvasHeight);

  const history: fabric.Object[] = [];
  const defaultBrush = useRef<BaseBrush>();
  useEffect(() => {
    if (!editor) return;
    editor.canvas.setHeight(2000);
    editor.canvas.isDrawingMode = true;
    defaultBrush.current = editor.canvas.freeDrawingBrush;
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    editor.canvas.loadFromJSON(JSON.parse(props.pageData === "" ? "{}" : props.pageData), () => {
      editor.canvas.renderAll();
    });
  }, [editor, props.pageData]);

  const togglePenMode = () => {
    if (!editor) return;
    if (!defaultBrush.current) return;
    editor.canvas.freeDrawingBrush = new fabric.BaseBrush();
    editor.canvas.isDrawingMode = true;
    editor.canvas.freeDrawingBrush = defaultBrush.current;
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
  };

  const undo = () => {
    if (!editor) return;
    if (editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop() as fabric.Object);
    }
    editor.canvas.renderAll();
    handleSave();
  };

  const redo = () => {
    if (!editor) return;
    if (history.length > 0) {
      editor.canvas.add(history.pop() as fabric.Object);
    }
    handleSave();
  };

  const eraserMode = () => {
    if (!editor) return;
    //@ts-expect-error EraserBrush is from the extended fabric library and needed additional installation
    editor.canvas.freeDrawingBrush = new fabric.EraserBrush(editor.canvas);
    editor.canvas.freeDrawingBrush.width = 20;
  };

  const handleSave = () => {
    if (!editor) return;
    setTimeout(() => {
      props.saveCallback(JSON.stringify(editor.canvas.toJSON()));
    }, 50);
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

      <div id="note-page" onMouseUp={handleSave}>
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      </div>
    </>
  );
}
