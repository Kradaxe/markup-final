import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { Profile } from "../profile/profile";

const Navbar = ({ logged }) => {
  const { dispatch } = useContext(DarkModeContext);
  const [a, b] = useState(false);

  return (
    <div className="item">
      <div className="dropdown_menu">
        <a href="/login">
          {!logged && (
            <button className="avatar" onClick={() => b(!a)}>
              Login
            </button>
          )}
        </a>

        {logged && (
          <div className="drop_menu">
            <button>Your Profile</button>
            <br />
            <button>Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
