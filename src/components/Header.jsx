import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Navbar from "./navbar/Navbar";
import { storageRemove } from "../utils/storage";
import { STORAGE_KEY_USER } from "../const/storageKeys";

const StyledHeader = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.textColor};
  width: 100%;
  height: 3.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  border-bottom: solid 0.2rem ${(props) => props.theme.colors.border};
`;
const StyledTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSize.h1};
  color: ${(props) => props.theme.colors.textColor};
`;
const StyledUserProfileButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.textColor};
`;
const StyledUserName = styled.h3`
  font-size: ${(props) => props.theme.fontSize.h3};
`;

const Header = () => {
  const { user, setUser } = useUser();

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      storageRemove(STORAGE_KEY_USER);
      setUser(null);
    }
  };

  return (
    <StyledHeader>
      <NavLink to="/">
        <StyledTitle>Lost In Translation</StyledTitle>
      </NavLink>
      <Navbar />
      {/* <StyledUserProfileButton>
        <StyledUserName>{user && user.username}</StyledUserName>
      </StyledUserProfileButton> */}
      <NavLink to="/profile">
        <StyledUserName>{user && user.username}</StyledUserName>
      </NavLink>
      <StyledUserProfileButton onClick={handleLogoutClick}>
        {user && <StyledUserName>Logout</StyledUserName>}
      </StyledUserProfileButton>
    </StyledHeader>
  );
};

export default Header;
