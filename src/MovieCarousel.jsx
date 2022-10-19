import { Carousel } from "@mantine/carousel"
import { createStyles, Image, Title, UnstyledButton } from "@mantine/core"
import { openContextModal } from "@mantine/modals"
import { IconChevronRight, IconChevronLeft } from "@tabler/icons"
import { arrayOf, number, shape, string } from "prop-types"

const useStyles = createStyles((theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },
  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
  control: {
    borderWidth: 2,
    backgroundColor: theme.colors.dark[8],
    color: theme.white,
  },
  viewport: { borderRadius: 4 },
}))

const MovieCarousel = ({ title, movies, slidesToScroll, breakpoints }) => {
  const { classes } = useStyles()
  const openMovieModal = (movie) => {
    openContextModal({
      modal: "movie",
      innerProps: {
        movie,
      },
    })
  }

  return (
    <div>
      <Title order={3} color="white" mx="md" mb="xs">
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
        controlSize={40}
        classNames={classes}
        nextControlIcon={<IconChevronRight />}
        previousControlIcon={<IconChevronLeft/>}
        nextControlLabel="Show next slide of movies"
        previousControlLabel="Show previous slide of movies"
      >
        {movies.map((movie) => (
          <Carousel.Slide key={movie.id}>
            <UnstyledButton onClick={() => openMovieModal(movie)} aria-label={`Learn about ${movie.title}`}>
              <Image
                radius="sm"
                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                alt={`${movie.title} poster`}
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
