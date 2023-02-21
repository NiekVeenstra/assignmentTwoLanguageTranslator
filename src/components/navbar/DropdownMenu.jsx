import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { STORAGE_KEY_USER } from "../../const/storageKeys";
import { useUser } from "../../context/UserContext";
import { storageRemove } from "../../utils/storage";

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  border: 0.1rem solid ${(props) => props.theme.colors.white};
  border-radius: 5px;
  cursor: pointer;
  width: 8rem;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: 0.7rem;
  border: 0.1rem solid ${(props) => props.theme.colors.white};
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  width: 100%;
`;

const DropdownMenuItem = styled.li`
  padding: 0.4rem 0.7rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundColorActive};
    color: ${(props) => props.theme.colors.white};
  }
`;

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { setUser } = useUser();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    handleCloseMenu();
    if (window.confirm("Are you sure you want to logout?")) {
      storageRemove(STORAGE_KEY_USER);
      setUser(null);
    }
  };

  const handleCloseMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <DropdownWrapper>
      <DropdownToggle onClick={toggleDropdown}>Menu</DropdownToggle>
      {isOpen && (
        <DropdownMenu>
          <DropdownMenuItem>
            <NavLink onClick={handleCloseMenu} to="/translation">
              Translations
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavLink onClick={handleCloseMenu} to="/profile">
              Profile
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogoutClick}>Logout</DropdownMenuItem>
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
}

export default Dropdown;
