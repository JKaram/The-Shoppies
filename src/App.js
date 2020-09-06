import React, { useState, useCallback, useEffect } from "react";

import { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from './Global';
import theme from "themes/theme";
import debounce from "lodash/debounce";
import { useCookies } from 'react-cookie';



import { SearchBar, SearchResultsArea, ProgressBar, NominationArea, MovieItem, PageLayout, Spinner } from "./components"
import { searchMovies } from "./utils"

function App() {
  const [cookies, setCookie] = useCookies(['nominations']);

  const [state, setState] = useState({
    searchTerm: "",
    searchResults: [],
    noms: [],
    loading: false,
  });

  const { searchTerm, searchResults, noms, loading } = state;

  // Set cookies
  useEffect(() => {
    if (cookies.nominations) {
      setState((prevState) => ({ ...prevState, noms: [...cookies.nominations] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = async (text) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const movieList = await searchMovies(text)
    setState((prevState) => ({ ...prevState, searchResults: movieList.Search }));

    setTimeout(function () {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }, 1500);
  };

  const debouncedSearch = useCallback(
    debounce((text) => search(text), 250),
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
        const updatedNoms = noms.filter(nom => nom.imdbID !== nomToRemove.imdbID)
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

            {loading && <Spinner />}

            {searchResults && !loading && (
              searchResults.map(searchResult => (
                <MovieItem
                  key={searchResult.imdbID}
                  addNom={addNom}
                  removeNom={removeNom}
                  isNominated={isNominated(searchResult.imdbID)}
                  movieInfo={searchResult} />
              ))
            )}
          </SearchResultsArea>
          <NominationArea>
            <ProgressBar percent={noms.length} />
            {noms && (
              noms.map(nom => (
                <div key={nom.Title} onClick={() => removeNom(nom)}>{nom.Title}</div>
              ))
            )}
          </NominationArea>

        </div>
      </PageLayout>
    </ThemeProvider>
  );
}

export default App;
