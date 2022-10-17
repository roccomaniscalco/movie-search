import { useQuery } from "@tanstack/react-query"
import { arrayOf, number, shape, string } from "prop-types"
import React from "react"
import api from "~/api"
import MovieCarousel from "~/MovieCarousel"

const GenreMovieCarousel = ({ genre, slidesToScroll, breakpoints }) => {
  const { data: genreMovies } = useQuery(["genreMovies", genre.id], () =>
    api.getMoviesByGenre(genre.id)
  )

  return (
    <MovieCarousel
      title={genre.name}
      slidesToScroll={slidesToScroll}
      breakpoints={breakpoints}
      movies={genreMovies.results}
    />
  )
}

GenreMovieCarousel.propTypes = {
  genre: shape({
    id: number.isRequired,
    name: string.isRequired,
  }).isRequired,
  slidesToScroll: number.isRequired,
  breakpoints: arrayOf(
    shape({
      maxWidth: string.isRequired,
      slideSize: string.isRequired,
    })
  ).isRequired,
}
export default GenreMovieCarousel
