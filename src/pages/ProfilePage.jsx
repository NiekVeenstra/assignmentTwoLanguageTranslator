import { useEffect } from "react";
import styled from "styled-components";
import { orderClearHistory } from "../api/translation";
import { userById } from "../api/user";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { useUser } from "../context/UserContext";
import withAuth from "../hoc/withAuth";
import { storageSave } from "../utils/storage";

const StyledProfilePage = styled.div`
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

const StyledSubTitle = styled.h3`
  margin-top: 1.3vh;
`;

const StyledSearchContainer = styled.div`
  border: solid 0.2rem ${(props) => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  margin: 3rem;
  border-radius: 40px;
  overflow: hidden;
  width: 90vw;
  max-width: 70rem;
`;

const StyledHistoryContainer = styled.div`
  border-bottom: solid 1px ${(props) => props.theme.colors.border};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  span {
    margin: 1rem 1rem 0.3rem 1rem;
  }
`;

const StyledIndexSpan = styled.span`
  width: 1rem;
`;

const StyledSpan = styled.span``;

const StyledButton = styled.button`
  border: solid 0.2rem ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.textColor};
  border-radius: 40px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundColorActive};
  }
`;

const ProfilePage = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const findUser = async () => {
      const [error, latestUser] = await userById(user.id);
      if (error === null) {
        storageSave(STORAGE_KEY_USER, latestUser);
        setUser(latestUser);
      }
    };

    findUser();
  }, [setUser, user.id]);

  const handleClearHistoryClick = async () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }

    const [clearError] = await orderClearHistory(user.id);

    if (clearError !== null) {
      return;
    }

    const upatedUser = {
      ...user,
      translations: [],
    };

    storageSave(STORAGE_KEY_USER, upatedUser);
    setUser(upatedUser);
  };

  return (
    <StyledProfilePage>
      <StyledTitle>ProfilePage</StyledTitle>
      <StyledSubTitle>Hello {user.username}</StyledSubTitle>
      {user.translations.length !== 0 && (
        <StyledSearchContainer>
          {user.translations.slice(-10).map((translation, index) => {
            return (
              <StyledHistoryContainer key={index}>
                <StyledIndexSpan>{index + 1}. </StyledIndexSpan>
                <StyledSpan>{translation}</StyledSpan>
              </StyledHistoryContainer>
            );
          })}
        </StyledSearchContainer>
      )}
      {user.translations.length !== 0 && (
        <StyledButton onClick={handleClearHistoryClick}>
          Clear History
        </StyledButton>
      )}
    </StyledProfilePage>
  );
};

export default withAuth(ProfilePage);
