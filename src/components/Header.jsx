import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  background-color: ${props => props.theme.colors.backgroundColor};
  color: ${props => props.theme.colors.textColor};
  width: 100%;
  height: 3.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  border-bottom:solid .2rem ${props => props.theme.colors.primary};
`;
const StyledTitle = styled.h1`
  font-size: ${props => props.theme.fontSize.h1};
`;
const StyledUserProfileButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${props => props.theme.colors.textColor};
`;
const StyledUserName = styled.h3`
  font-size: ${props => props.theme.fontSize.h3};
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledTitle>Lost In Translation</StyledTitle>
      <StyledUserProfileButton>
        <StyledUserName>LoremData</StyledUserName>
      </StyledUserProfileButton>
    </StyledHeader>
  );
};

export default Header;
