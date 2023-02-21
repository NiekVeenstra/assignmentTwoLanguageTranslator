import styled from "styled-components";
import RegisterForm from "../components/RegisterForm";

const StyledStartupPage = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColor};
  color: ${(props) => props.theme.colors.textColor};
  width: 100%;
  height: calc(100vh - 3.3rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLoginContainer = styled.div`
  border: solid 0.3rem ${(props) => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 3rem;
  height: 30rem;
  border-radius: 40px;
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundColorActive};
    color: ${(props) => props.theme.colors.textColorDark};
  }

  @media (max-width: 500px) {
    width: 100%;
    min-width: 350px;
  }
  
`;

const StyledHeader = styled.h1``;

const StyledParagraph = styled.p``;

const StartupPage = () => {
  return (
    <StyledStartupPage>
      <StyledLoginContainer>
        <StyledHeader>Lost In Translation</StyledHeader>
        <StyledParagraph>Get started here</StyledParagraph>
        <StyledParagraph>What is your name?</StyledParagraph>
        <RegisterForm />
      </StyledLoginContainer>
    </StyledStartupPage>
  );
};

export default StartupPage;
