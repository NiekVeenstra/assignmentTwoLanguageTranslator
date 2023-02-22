import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user";
import { storageSave } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEY_USER } from "../../const/storageKeys";

import { FiArrowRightCircle } from "react-icons/fi";

const StyledRegisterForm = styled.div`
  width: 20rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
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
  background-color: ${(props) => props.theme.colors.white};
  width: 25%;
  height: 100%;
  border-radius: 40px;
  cursor: pointer;
`;

const StyledFiArrowRightCircle = styled(FiArrowRightCircle)`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.textColorActive};
`;

const usernameConfig = {
  required: true,
  minLength: 2,
  maxLength: 10,
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
      navigate("translation");
    }
  }, [user, navigate]);

  const onSubmit = async ({ username }) => {
    setLoading(true);
    const [error, userResponse] = await loginUser(username);
    if (error !== null) {
      setApiError(error);
    }
    if (userResponse !== null) {
      storageSave(STORAGE_KEY_USER, userResponse);
      setUser(userResponse);
    }
    setLoading(false);
  };

  const errorMessage = (() => {
    if (!errors.username) {
      return null;
    }
    if (errors.username.type === "required") {
      return <p>*Username is required.</p>;
    }
    if (errors.username.type === "minLength") {
      return <p>*Username needs atleast 2 characters.</p>;
    }
    if (errors.username.type === "maxLength") {
      return <p>*Username needs less then 11 characters.</p>;
    }
  })();

  return (
    <StyledRegisterForm>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFieldset>
          <StyledInput
            type="text"
            {...register("username", usernameConfig)}
            placeholder="JohnDoe"
          />
        </StyledFieldset>
        <StyledButton type="submit" disabled={loading}>
          <StyledFiArrowRightCircle />
        </StyledButton>
      </StyledForm>
      {errorMessage}
      {loading && <p>Logging in...</p>}
      {apiError && <p>apiError</p>}
    </StyledRegisterForm>
  );
};

export default RegisterForm;
