const apiKey = process.env.REACT_APP_OMDB_API_KEY
const URL = "http://www.omdbapi.com/"

// Request Movie List
async function searchMovies(search, API = apiKey, url = URL) {
    const fetchResponse = await fetch(`${url}?${API}&s=${search}`);
    return await fetchResponse.json()
}

// Request More Info
async function moreMovieInfo(movieId, API = apiKey, url = URL) {
    const fetchResponse = await fetch(`${url}?${API}&i=${movieId}`);
    return await fetchResponse.json()
}
export { searchMovies, moreMovieInfo }

