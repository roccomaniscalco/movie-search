import { Carousel } from "@mantine/carousel"
import { Image, Title, UnstyledButton } from "@mantine/core"
import { openContextModal } from "@mantine/modals"
import { arrayOf, number, shape, string } from "prop-types"

const openMovieModal = (movie) => {
  openContextModal({
    modal: "movie",
    innerProps: {
      movie,
    },
  })
}

const MovieCarousel = ({ title, movies, slidesToScroll, breakpoints }) => {
  return (
    <div>
      <Title order={3} mx="md" mb="xs">
        {title}
      </Title>

      <Carousel
        slidesToScroll={slidesToScroll}
        breakpoints={breakpoints}
        loop
        align="start"
        mx="md"
        slideGap="sm"
        slideSize="10%"
        styles={{ viewport: { borderRadius: 4 } }}
      >
        {movies.map((movie) => (
          <Carousel.Slide key={movie.id}>
            <UnstyledButton onClick={() => openMovieModal(movie)}>
              <Image
                radius="sm"
                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              />
            </UnstyledButton>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
}

MovieCarousel.propTypes = {
  title: string.isRequired,
  movies: arrayOf(
    shape({
      id: number.isRequired,
      poster_path: string.isRequired,
    })
  ).isRequired,
  slidesToScroll: number.isRequired,
  breakpoints: arrayOf(
    shape({
      maxWidth: string.isRequired,
      slideSize: string.isRequired,
    })
  ).isRequired,
}
export default MovieCarousel
