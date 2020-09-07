const OMDB_API_URL = process.env.REACT_APP_OMDB_API_URL
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY

const omdbUrl = `${OMDB_API_URL}?&apikey=${OMDB_API_KEY}`;

// Fetch movie list based on search
async function fetchMovies(search) {
    const fetchResponse = await fetch(`${omdbUrl}&s=${search}`);
    return await fetchResponse.json()
}

// Request specific movie details
async function fetchMovieDetails(movieId) {
    const fetchResponse = await fetch(`${omdbUrl}&i=${movieId}`);
    return await fetchResponse.json()
}

export { fetchMovies, fetchMovieDetails }
