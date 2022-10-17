import { Carousel } from "@mantine/carousel"
import { Image, Title } from "@mantine/core"
import { arrayOf, number, shape, string } from "prop-types"

const MovieCarousel = ({ title, movies, slidesToScroll, breakpoints }) => {
  return (
    <div>
      <Title order={2} mx="md" mb="xs">
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
            <Image
              radius="sm"
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            />
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
