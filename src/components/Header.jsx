import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import DropdownMenu from "./navbar/DropdownMenu";

const StyledHeader = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColorActive};
  color: ${(props) => props.theme.colors.textColorDark};
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
`;

const StyledUserName = styled.h3`
  font-size: ${(props) => props.theme.fontSize.h3};
`;

const Header = () => {
  const { user } = useUser();

  return (
    <StyledHeader>
      <NavLink to="/">
        <StyledTitle>Lost In Translation</StyledTitle>
      </NavLink>
      <NavLink to="/profile">
        <StyledUserName>{user && user.username}</StyledUserName>
      </NavLink>
      {user !== null && <DropdownMenu/>}
    </StyledHeader>
  );
};

export default Header;
