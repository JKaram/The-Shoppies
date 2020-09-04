const apiKey = process.env.REACT_APP_OMDB_API_KEY


async function searchMovies(search, API = apiKey, url = "http://www.omdbapi.com/") {
    const fetchResponse = await fetch(`${url}?${API}&s=${search}&page=4`);
    return await fetchResponse.json()
}

export { searchMovies }

