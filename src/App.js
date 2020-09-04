import React from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from './Global';
import theme from "themes/light";

function App() {
  return (
    <ThemeProvider theme={theme}>

      <GlobalStyle />

      Hello World fdfdsaadfdszsaasadsasdddddddddddd111
    </ThemeProvider>
  );
}

export default App;
