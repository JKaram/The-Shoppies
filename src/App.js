import React, { useState, useCallback } from "react";

import styled, { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from './Global';
import theme from "themes/theme";

import { SearchBar } from "./components"
import { searchMovies } from "./utils"

function App() {
  const [state, setState] = useState({
    searchTerm: "",
    noms: [],
    loading: false,
  });

  const { searchTerm, noms, loading } = state;

  const search = async (text) => {
    const movieList = await searchMovies(text)
    return setState((prevState) => ({ ...prevState, noms: movieList.Search }));
  }

  const updateText = (text) => {
    setState((prevState) => ({ ...prevState, searchTerm: text }));
  };
  console.log(noms)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SearchBar
        searchTerm={searchTerm}
        updateText={updateText}
        search={search}
      />
      <div>
        {noms && (
          noms.map(nom => (
            <>
              <div key={nom.title}>{nom.Title}</div>
            </>
          ))
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
