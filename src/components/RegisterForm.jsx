import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const StyledRegisterForm = styled.div`
  width: 20rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInputContainer = styled.form`
  background-color: ${(props) => props.theme.colors.white};
  padding: 0.3rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`;

const StyledInput = styled.input`
  border: none;
  width: 75%;
  height: 100%;
  border-radius: 40px;
  outline: none;
  font-size: 2rem;
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.textColor};
  width: 25%;
  height: 100%;
  border-radius: 40px;
  cursor: pointer;
`;

const RegisterForm = () => {
  const { username, setUsername } = useContext(UserContext);

  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };

  const submitNameToAPI = (e) => {
    e.preventDefault();
    if (username) {
      console.log("send Name to api");
    }
  };

  return (
    <StyledRegisterForm>
      <StyledInputContainer>
        <StyledInput type="text" onChange={handleOnChange} />
        <StyledButton onClick={submitNameToAPI}>arrow</StyledButton>
      </StyledInputContainer>
    </StyledRegisterForm>
  );
};

export default RegisterForm;
