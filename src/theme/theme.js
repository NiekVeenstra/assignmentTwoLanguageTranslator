import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    backgroundColor: "#ADD8E6",
    textColor: "#FFA500",
    border: "#ffa6007d",
    white: "#ffffff",
  },
  fontSize: {
    h1: "1.2rem",
    h2: "1.1rem",
    h3: "1rem",
    h4: "0.9rem",
  },
};

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: "Montserrat", sans-serif;
        height: 100%;
    }
    button {
        border: none;
    }
`;
