import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Navbar from "./navbar/Navbar";
import { storageRemove } from "../utils/storage";
import { STORAGE_KEY_USER } from "../const/storageKeys";

// const StyledHeader = styled.div`
//   background-color: ${(props) => props.theme.colors.backgroundColor};
//   color: ${(props) => props.theme.colors.textColor};
//   width: 100%;
//   height: 3.3rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 3rem;
//   border-bottom: solid 0.2rem ${(props) => props.theme.colors.border};
// `;
// const StyledTitle = styled.h1`
//   font-size: ${(props) => props.theme.fontSize.h1};
//   color: ${(props) => props.theme.colors.textColor};
// `;
// const StyledUserProfileButton = styled.button`
//   border: none;
//   background-color: transparent;
//   color: ${(props) => props.theme.colors.textColor};
// `;
// const StyledUserName = styled.h3`
//   font-size: ${(props) => props.theme.fontSize.h3};
// `;

const Header = () => {
  const { user, setUser } = useUser();

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      storageRemove(STORAGE_KEY_USER);
      setUser(null);
    }
  };

  return (
    <div>
      <NavLink to="/">
        <h1>Lost In Translation</h1>
      </NavLink>
      <Navbar />
      {/* <StyledUserProfileButton>
        <StyledUserName>{user && user.username}</StyledUserName>
      </StyledUserProfileButton> */}
      <NavLink to="/profile">
        <h2>{user && user.username}</h2>
      </NavLink>
      <button onClick={handleLogoutClick}>
        {user && <h3>Logout</h3>}
      </button>
    </div>
  );
};

export default Header;
