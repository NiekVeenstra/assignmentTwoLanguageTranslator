import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    backgroundColor: "#ADD8E6",
    textColor: "#FFA500",
    primary: "#ffa6007d",
    secondary: "#f5f5f5",
  },
  fontSize: {
    h1: "1.2rem",
    h2: "1.1rem",
    h3: "1rem",
    h4: "0.9rem",
  },
};

// export const GlobalStyle = createGlobalStyle`
//   body {
//     background-color: ${(props) => props.theme.colors.secondary};
//     color: ${(props) => props.theme.colors.text};
//   }
// `;
