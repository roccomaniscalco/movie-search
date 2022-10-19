const fetcher = async (url, options) => {
  const res = await fetch(url, options)

  if (!res.ok) {
    const resJson = await res.json()
    const error = new Error()
    error.status = res.status
    error.message = resJson.message
    throw error
  }

  return res.json()
}

const GET = (url) => {
  return fetcher(url, {
    method: "GET",
  })
}

const getNowPlayingMovies = () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
    import.meta.env.VITE_MOVIE_DB_API_KEY
  }&language=en-US&page=1`
  return GET(url)
}

const getGenres = () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${
    import.meta.env.VITE_MOVIE_DB_API_KEY
  }&language=en-US`
  return GET(url)
}

const getMoviesByGenre = (genreId) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${
    import.meta.env.VITE_MOVIE_DB_API_KEY
  }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=
  false&page=1&with_genres=${genreId}`
  return GET(url)
}

const getMovieSearchResults = (searchTerm) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${
    import.meta.env.VITE_MOVIE_DB_API_KEY
  }&language=en-US&query=${searchTerm}&page=1&include_adult=false`
  return GET(url)
}

const api = {
  getNowPlayingMovies,
  getGenres,
  getMoviesByGenre,
  getMovieSearchResults,
}
export default api
