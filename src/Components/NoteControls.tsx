import "../styles/NoteControls.css";
import pen from "../assets/img/pen.svg";
import highlight from "../assets/img/highlight.svg";
import erase from "../assets/img/erase.svg";
import undo from "../assets/img/undo.svg";
import redo from "../assets/img/redo.svg";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useState } from "react";

import { Button } from "@mui/material";

interface NoteControlsProps {
  togglePenMode: () => void;
  toggleHighlighter: () => void;
  toggleSelect: () => void;
  changeColor: () => void;
  undo: () => void;
  redo: () => void;
  toggleEraser: () => void;
}

export default function NoteControls(props: NoteControlsProps) {
  const [penOptionsHidden, setPenOptionsHidden] = useState<"hide-pen" | "hide-pen-display-none" | "show-pen">("hide-pen-display-none");

  const togglePenOptions = () => {
    if (penOptionsHidden !== "show-pen") {
      setPenOptionsHidden("show-pen");
    } else {
      setPenOptionsHidden("hide-pen");
      setTimeout(() => {
        setPenOptionsHidden("hide-pen-display-none");
      }, 300);
    }
  };

  return (
    <>
      <div id="note-controls-wrapper">
        <div className={`pen-options ${penOptionsHidden}`}>
          <Button onClick={props.togglePenMode}>
            <div className="color-option black"></div>
          </Button>
          <Button onClick={props.togglePenMode}>
            <div className="color-option blue"></div>
          </Button>
          <Button onClick={props.togglePenMode}>
            <div className="color-option red"></div>
          </Button>
          <Button onClick={props.togglePenMode}>
            <SettingsOutlinedIcon color="secondary" />
          </Button>
        </div>
        <Button onClick={togglePenOptions}>
          <img src={pen} className="control-icons" />
        </Button>
        <Button onClick={props.toggleEraser}>
          <img src={erase} className="control-icons" />
        </Button>
        <Button onClick={props.toggleHighlighter}>
          <img src={highlight} className="control-icons" />
        </Button>
        <Button onClick={props.undo}>
          <img src={undo} className="control-icons" />
        </Button>
        <Button onClick={props.redo}>
          <img src={redo} className="control-icons" />
        </Button>

        {/* <button onClick={props.toggleSelect}>Toggle Select</button> */}
        {/* <button onClick={props.changeColor}>ChangeColor</button> */}
      </div>
    </>
  );
}
