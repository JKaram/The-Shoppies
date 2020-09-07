import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { ThemeProvider } from 'styled-components/macro';
import GlobalStyle from './Global';
import theme from "themes/theme";
import debounce from "lodash/debounce";
import { useCookies } from 'react-cookie';
import { TransitionGroup, CSSTransition } from "react-transition-group";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

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
            <TransitionGroup component={NomsHolder}>
              {noms && (
                noms.map(nom => (
                  <CSSTransition key={nom.Title} timeout={300} classNames="transition">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 5px", margin: "10px 0" }}>
                      <div >{nom.Title}</div>
                      <FontAwesomeIcon icon={faTimes} onClick={() => removeNom(nom)} />
                    </div>
                  </CSSTransition>
                ))
              )}
            </TransitionGroup>

          </NominationArea>

        </div>
      </PageLayout>
    </ThemeProvider>
  );
}

export default App;


const NomsHolder = styled.div`

  .transition-enter {
    opacity: 0.01;
    transform: translate(0, -10px);
  }
  .transition-enter-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 300ms ease-in;
  }
  .transition-exit {
    opacity: 1;
    transform: translate(0, 0);
  }
  .transition-exit-active {
    opacity: 0.01;
    transform: translate(0, 10px);
    transition: all 300ms ease-in;
  }
`;