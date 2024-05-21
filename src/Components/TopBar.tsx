import "../styles/TopBar.css";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button } from "@mui/material";

interface TopBarProps {
  handleOpenModal: () => void;
}

export default function TopBar(props: TopBarProps) {
  return (
    <div id="top-bar">
      <Button variant="text">
        <SettingsOutlinedIcon fontSize="large" />
      </Button>
      <h1>Simple Spiral Notes</h1>
      <Button variant="text" onClick={props.handleOpenModal}>
        <AddOutlinedIcon fontSize="large" />
      </Button>
    </div>
  );
}
