import React, { useState, useCallback } from "react";

import styled, { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from './Global';
import theme from "themes/theme";
import debounce from "lodash/debounce";


import { SearchBar, SearchResultsArea, ProgressBar, NominationArea, MovieItem } from "./components"
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

  const debouncedSearch = useCallback(
    debounce((text) => search(text), 500),
    []
  );

  const updateText = (text) => {
    setState((prevState) => ({ ...prevState, searchTerm: text }));
  };

  const addNom = (newNom) => {
    if (noms.length >= 5) return
    if (noms.includes(newNom)) return
    setState((prevState) => ({ ...prevState, noms: [...noms, newNom] }));
  }


  const removeNom = (nomToRemove) => {
    for (let i in noms) {
      if (noms[i].imdbID === nomToRemove.imdbID) {
        console.log(i, "i")
        setState((prevState) => ({ ...prevState, noms: noms.splice(i, 1) }));
      }
    }
  }

  const isNominated = (movieId) => {
    for (let i in noms) {
      if (noms[i].imdbID === movieId) {
        return true
      }
    }
    return false
  }

  const clearResults = () => {
    setState((prevState) => ({
      ...prevState,
      searchResults: [],
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div style={{ display: "flex" }}>
        <SearchResultsArea >
          <SearchBar
            searchTerm={searchTerm}
            debouncedSearch={debouncedSearch}
            updateText={updateText}
            clearResults={clearResults}
          />
          {searchResults && (
            searchResults.map(searchResult => (
              <MovieItem
                key={searchResult.imdbID}
                addNom={addNom}
                removeNom={removeNom}
                isNominated={isNominated(searchResult.imdbID)}
                movieInfo={searchResult}>
                {searchResult.Title}
              </MovieItem>

            ))
          )}
        </SearchResultsArea>




        <NominationArea>
          <ProgressBar percent={noms.length} />
          {noms && (
            noms.map(nom => (
              <>
                <div key={nom.imdID} onClick={() => removeNom(nom)}>{nom.Title}</div>
              </>
            ))
          )}

        </NominationArea>
      </div>
    </ThemeProvider>
  );
}

export default App;
