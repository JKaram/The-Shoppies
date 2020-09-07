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
    // Show loading spinner
    setState((prevState) => ({ ...prevState, loading: true }));

    // Fetch movie list from search query
    const response = await fetchMovies(query);

    const results = response.Error ? [] : response.Search

    // Update state with results
    setState((prevState) => ({ ...prevState, searchResults: results }));

    // Manually add some dead time to show loading bar for demo purposes
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
    setState((prevState) => ({ ...prevState, searchQuery: query }));
  };

  const addNomination = (movieDetails) => {
    if (nominations.length >= 5) return
    if (nominations.find((nom) => nom.imdbID === movieDetails.imdbID)) return;
    setState((prevState) => ({ ...prevState, nominations: [...nominations, movieDetails] }));
  }

  const removeNomination = (movieId) => {
    const updatedNominations = nominations.filter(
      (nom) => nom.imdbID !== movieId
    );

    setState((prevState) => ({ ...prevState, nominations: updatedNominations }));
  }

  const isNominated = (movieId) => !!nominations.find((nom) => nom.imdbID === movieId);

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

            {loading ? <Spinner /> :
              searchResults.map(searchResult => (
                < MovieItem
                  key={searchResult.imdbID}
                  addNomination={addNomination}
                  removeNomination={removeNomination}
                  isNominated={isNominated(searchResult.imdbID)}
                  movieInfo={searchResult} />
              ))
            }
          </SearchResultsArea>

          <NominationArea>
            <ProgressBar percent={nominations.length} />
            <TransitionGroup component={FadeIn}>
              {nominations && (
                nominations.map(nom => (
                  <CSSTransition key={nom.Title} timeout={300} classNames="transition">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 5px", margin: "10px 0" }}>
                      <h3>{nom.Title}</h3>
                      <FontAwesomeIcon className="icon" icon={faTimes} onClick={() => removeNomination(nom.imdbID)} />
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


