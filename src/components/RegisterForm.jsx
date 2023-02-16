import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/user";
import { storageSave } from "../utils/storage";
import { useNavigate } from "react-router-dom";

const StyledRegisterForm = styled.div`
  width: 20rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled.form`
  background-color: ${(props) => props.theme.colors.white};
  padding: 0.3rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`;

const StyledFieldset = styled.fieldset`
  border: none;
  width: 75%;
  height: 100%;
`;

const StyledInput = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 40px;
  outline: none;
  font-size: 2rem;
  padding: 0 0.7rem;
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.textColor};
  width: 25%;
  height: 100%;
  border-radius: 40px;
  cursor: pointer;
`;

const usernameConfig = {
  required: true,
  minLength: 2,
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (user !== null) {
      navigate.push("translation");
    }
  }, [user, navigate]);

  const onSubmit = async ({ username }) => {
    setLoading(true);
    const [error, userResponse] = await loginUser(username);
    if (error !== null) {
      setApiError(error);
    }
    if (userResponse !== null) {
      storageSave("translator-user", userResponse);
      setUser(userResponse);
    }
    setLoading(false);
  };

  const errorMessage = (() => {
    if (!errors.username) {
      return null;
    }
    if (errors.username.type === "required") {
      return console.log("Username is required.");
    }
    if (errors.username.type === "minLength") {
      return console.log("Username needs to be atleast 2 characters.");
    }
  })();

  return (
    <StyledRegisterForm>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFieldset>
          <label htmlFor="username"></label>
          <StyledInput
            type="text"
            {...register("username", usernameConfig)}
            placeholder="JohnDoe"
          />
          {errorMessage}
        </StyledFieldset>
        <StyledButton type="submit" disabled={loading}>
          arrow
        </StyledButton>
      </StyledForm>
      {loading && console.log("Logging in...")}
      {apiError && console.log(apiError)}
    </StyledRegisterForm>
  );
};

export default RegisterForm;
