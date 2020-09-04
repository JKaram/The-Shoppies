import React from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from './Global';
import theme from "themes/theme";

import { SearchBar } from "./components"
import { searchMovies } from "./utils"

function App() {
  const search = async (text) => {
    const batman = await searchMovies(text)
    console.log(batman)
  }



  return (
    <ThemeProvider theme={theme}>
      <SearchBar />
      <GlobalStyle />

      Hello World fdfdsaadfdszsaasadsasdddddddddddd111
    </ThemeProvider>
  );
}

export default App;
