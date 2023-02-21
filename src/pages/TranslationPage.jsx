import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiTranslate } from "react-icons/ri";
import styled from "styled-components";
import { translationAdd } from "../api/translation";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";
import { storageSave } from "../utils/storage";

const StyledTranslationPage = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.textColor};
  height: 100%;
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
`

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

const StyledResultImageContainer = styled.div`
  border: solid 0.2rem ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;
  margin: 3rem;
  border-radius: 40px;

  img {
    height: 12vw;
    max-height: 10rem;
  }
`;

const StyledEnter = styled.div`
  width: 5vw;
`;

const translationConfig = {
  required: true,
  minLength: 1,
  maxLength: 100,
};

const TranslationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useUser();
  const [split, setSplit] = useState([]);
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
    setSplit(translation.split(""));
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
          <StyledButton style={{ border: "solid white 1px" }} type="submit">
            <StyledRiTranslate />
          </StyledButton>
        </StyledForm>
      </StyledFormContainer>
      {errorMessage}
      {search && (
        <StyledResultImageContainer>
          {split.map((x, index) => {
            console.log(x);
            if (x === " ") {
              return <StyledEnter></StyledEnter>;
            }
            if (
              x === "1" ||
              x === "2" ||
              x === "3" ||
              x === "4" ||
              x === "5" ||
              x === "6" ||
              x === "7" ||
              x === "8" ||
              x === "9" ||
              x === "0"
            ) {
              return "";
            } else {
              return <img key={index} src={`img/${x}.png`} />;
            }
          })}
        </StyledResultImageContainer>
      )}
    </StyledTranslationPage>
  );
};

export default withAuth(TranslationPage);
