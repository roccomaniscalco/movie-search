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

const GET = async (url) => {
  return fetcher(url, {
    method: "GET",
  })
}

const getNowPlayingMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
    import.meta.env.VITE_MOVIE_DB_API_KEY
  }&language=en-US&page=1`
  return GET(url)
}

const api = {getNowPlayingMovies}
export default api