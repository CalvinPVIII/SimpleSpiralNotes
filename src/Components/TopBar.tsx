import "../styles/TopBar.css";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

interface TopBarProps {
  handleOpenModal: () => void;
}

export default function TopBar(props: TopBarProps) {
  return (
    <div id="top-bar">
      <SettingsOutlinedIcon />
      <h2>Home</h2>
      <AddOutlinedIcon onClick={props.handleOpenModal} />
    </div>
  );
}
