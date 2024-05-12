import "../styles/TopBar.css";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

interface TopBarProps {
  handleOpenModal: () => void;
}

export default function TopBar(props: TopBarProps) {
  return (
    <div id="top-bar">
      <SettingsOutlinedIcon fontSize="large" />
      <h1>Simple Spiral Notes</h1>
      <AddOutlinedIcon onClick={props.handleOpenModal} fontSize="large" />
    </div>
  );
}
