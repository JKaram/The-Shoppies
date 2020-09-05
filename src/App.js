import React, { useState, useCallback } from "react";

import styled, { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from './Global';
import theme from "themes/theme";

import { SearchBar } from "./components"
import { searchMovies } from "./utils"

function App() {
  const [state, setState] = useState({
    searchTerm: "",
    searchResults: [],
    noms: [],
    loading: false,
  });

  const { searchTerm, searchResults, noms, loading } = state;

  const search = async (text) => {
    const movieList = await searchMovies(text)
    return setState((prevState) => ({ ...prevState, searchResults: movieList.Search }));
  }

  const updateText = (text) => {
    setState((prevState) => ({ ...prevState, searchTerm: text }));
  };

  const addNom = (newNom) => {
    setState((prevState) => ({ ...prevState, noms: [...noms, newNom] }));
  }
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
        {searchResults && (
          searchResults.map(searchResult => (
            <>
              <div key={searchResult.title} onClick={() => addNom(searchResult)}>{searchResult.Title}</div>
            </>
          ))
        )}
      </div>

      <div>
        {noms && (
          noms.map(searchResult => (
            <>
              <div key={searchResult.imdID}>{searchResult.Title}</div>
            </>
          ))
        )}
      </div>

    </ThemeProvider>
  );
}

export default App;
