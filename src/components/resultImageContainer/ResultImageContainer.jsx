import React from "react";
import styled from "styled-components";

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

const ResultImageContainer = ({characterArray}) => {
  return (
    <StyledResultImageContainer>
      {characterArray.map((x, index) => {
        if (x === " ") {
          return <StyledEnter key={index}></StyledEnter>;
        }
        if (!isNaN(x)) {
          return "";
        } else {
          return <img key={index} src={`img/${x}.png`} alt="img" />;
        }
      })}
    </StyledResultImageContainer>
  );
};

export default ResultImageContainer;
