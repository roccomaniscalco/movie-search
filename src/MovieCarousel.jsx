import { Carousel } from "@mantine/carousel"
import { Image, Title } from "@mantine/core"
import { arrayOf, number, shape, string } from "prop-types"

const MovieCarousel = ({ title, movies, slidesToScroll, breakpoints }) => {
  return (
    <>
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
            <Image
              radius="sm"
              src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  )
}

MovieCarousel.propTypes = {
  title: string,
  movies: arrayOf(
    shape({
      id: string,
      poster_path: string,
    })
  ),
  slidesToScroll: number,
  breakpoints: arrayOf(
    shape({
      maxWidth: string,
      slideSize: string,
    })
  ),
}
export default MovieCarousel
