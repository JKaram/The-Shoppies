import React, { useState, useCallback } from "react";

import styled, { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from './Global';
import theme from "themes/theme";
import debounce from "lodash/debounce";
import { useCookies } from 'react-cookie';



import { SearchBar, SearchResultsArea, ProgressBar, NominationArea, MovieItem, PageLayout } from "./components"
import { searchMovies } from "./utils"

function App() {
  const [cookies, setCookie] = useCookies(['nominations']);

  const [state, setState] = useState({
    searchTerm: "",
    searchResults: [],
    noms: [...cookies.nominations],
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
    setCookie('nominations', noms);
  }


  const removeNom = (nomToRemove) => {
    for (let i in noms) {
      if (noms[i].imdbID === nomToRemove.imdbID) {
        const updatedNoms = noms.splice(i, 1);
        setState((prevState) => ({ ...prevState, noms: updatedNoms }));
        setCookie('nominations', noms);
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
      <PageLayout>
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
      </PageLayout>
    </ThemeProvider>
  );
}

export default App;
