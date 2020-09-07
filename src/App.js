import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import debounce from "lodash/debounce";
import React, { useState, useCallback, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ThemeProvider } from 'styled-components';

import { SearchBar, SearchResultsArea, ProgressBar, NominationArea, MovieItem, PageLayout, Spinner, Header } from "./components"
import GlobalStyle from './Global';
import { FadeIn } from "styles"
import theme from "themes/theme";
import { fetchMovies, getLocalNominations, setLocalNominations } from "./utils";

const App = () => {

  const [state, setState] = useState({
    searchQuery: "",
    searchResults: [],
    nominations: getLocalNominations(),
    loading: false,
  });

  const { searchQuery, searchResults, nominations, loading } = state;

  // Update local storage when nominations change
  useEffect(() => {
    setLocalNominations(nominations);
  }, [nominations]);

  const search = async (query) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const movieList = await fetchMovies(query);
    setState((prevState) => ({ ...prevState, searchResults: movieList.Search }));

    setTimeout(function () {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }, 1500);
  };

  const debouncedSearch = useCallback(
    debounce((query) => search(query), 250),
    []
  );

  const updateQuery = (query) => {
    setState((prevState) => ({ ...prevState, query: query }));
  };

  const addNom = (newNom) => {
    if (nominations.length >= 5) return
    if (nominations.includes(newNom)) return
    setState((prevState) => ({ ...prevState, nominations: [...nominations, newNom] }));
  }

  const removeNom = (nomToRemove) => {
    for (let i in nominations) {
      if (nominations[i].imdbID === nomToRemove.imdbID) {
        const updatedNoms = nominations.filter(nom => nom.imdbID !== nomToRemove.imdbID)
        setState((prevState) => ({ ...prevState, nominations: updatedNoms }));
      }
    }
  }

  const isNominated = (movieId) => {
    for (let i in nominations) {
      if (nominations[i].imdbID === movieId) {
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
        <Header />
        <div style={{ display: "flex" }}>

          <SearchResultsArea >
            <SearchBar
              searchQuery={searchQuery}
              debouncedSearch={debouncedSearch}
              updateQuery={updateQuery}
              clearResults={clearResults}
            />

            {loading && <Spinner />}

            {!loading && searchResults && (
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
            <ProgressBar percent={nominations.length} />
            <TransitionGroup component={FadeIn}>
              {nominations && (
                nominations.map(nom => (
                  <CSSTransition key={nom.Title} timeout={300} classNames="transition">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 5px", margin: "10px 0" }}>
                      <h3>{nom.Title}</h3>
                      <FontAwesomeIcon className="icon" icon={faTimes} onClick={() => removeNom(nom)} />
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


