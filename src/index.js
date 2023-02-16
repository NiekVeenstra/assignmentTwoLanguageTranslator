import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./theme/theme";
import AppContext from "./context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContext>
        <BrowserRouter>
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </AppContext>
    </ThemeProvider>
  //</React.StrictMode>
);

reportWebVitals();
