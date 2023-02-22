import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiTranslate } from "react-icons/ri";
import styled from "styled-components";
import { translationAdd } from "../api/translation";
import ResultImageContainer from "../components/resultImageContainer/ResultImageContainer";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";
import { storageSave } from "../utils/storage";

const StyledTranslationPage = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.textColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.h2`
  margin-top: 3.3vh;
`;

const StyledParagraph = styled.p`
  margin-top: 2.3vh;
  text-align: center;
`;

const StyledFormContainer = styled.div`
  margin-top: 5.3vh;
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

const StyledRiTranslate = styled(RiTranslate)`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.textColorActive};
  border: solid 0.4rem;
  border-radius: 50px;
`;

const translationConfig = {
  required: true,
  minLength: 1,
  maxLength: 30,
};

const TranslationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useUser();
  const [characterArray, setCharacterArray] = useState([]);
  const [search, setSearch] = useState(false);

  const onSubmit = async ({ translations }) => {
    const [error, result] = await translationAdd(user, translations);

    if (error !== null) {
      return;
    }

    storageSave(STORAGE_KEY_USER, result);
    setUser(result);

    console.log("error", error);
    console.log("result", result);

    createTranslation(translations);
    setSearch(true);
  };

  const createTranslation = (translation) => {
    setCharacterArray(translation.split(""));
  };

  const errorMessage = (() => {
    if (!errors.translations) {
      return null;
    }
    if (errors.translations.type === "required") {
      return <p>*Input is required.</p>;
    }
    if (errors.translations.type === "maxLength") {
      return <p>*Input needs less then {translationConfig.maxLength + 1} characters.</p>;
    }
  })();

  return (
    <StyledTranslationPage>
      <StyledTitle>TranslationPage</StyledTitle>
      <StyledParagraph>write the text you want to translate to sign language</StyledParagraph>
      <StyledFormContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledFieldset>
            <StyledInput type="text" {...register("translations", translationConfig)} />
          </StyledFieldset>
          <StyledButton type="submit">
            <StyledRiTranslate />
          </StyledButton>
        </StyledForm>
      </StyledFormContainer>
      {errorMessage}
      {search && <ResultImageContainer characterArray={characterArray} />}
    </StyledTranslationPage>
  );
};

export default withAuth(TranslationPage);
