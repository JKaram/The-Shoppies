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
    if (noms.includes(newNom)) return
    setState((prevState) => ({ ...prevState, noms: [...noms, newNom] }));
  }

  const removeNom = (nomToRemove) => {
    for (let i in noms) {
      if (noms[i].Title === nomToRemove.Title) {
        setState((prevState) => ({ ...prevState, noms: noms.splice(i, 1) }));
      }
    }
  }

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
          noms.map(nom => (
            <>
              <div key={nom.imdID} onClick={() => removeNom(nom)}>{nom.Title}</div>
            </>
          ))
        )}
      </div>

    </ThemeProvider>
  );
}

export default App;
