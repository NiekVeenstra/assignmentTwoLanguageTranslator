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

const StyledHeader = styled.h1``;

const StyledParagraph = styled.p``;

const StartupPage = () => {
  return (
    <StyledStartupPage>
      <StyledHeader>Lost In Translation</StyledHeader>
      <StyledParagraph>Get started here</StyledParagraph>
      <RegisterForm/>
    </StyledStartupPage>
  );
};

export default StartupPage;
