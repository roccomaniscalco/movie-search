import { Carousel } from "@mantine/carousel"
import {
  CloseButton,
  Grid,
  Group,
  Image,
  RingProgress,
  Spoiler,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core"
import { closeAllModals, openModal } from "@mantine/modals"
import { IconChevronDown, IconChevronUp } from "@tabler/icons"
import { arrayOf, number, shape, string } from "prop-types"

const handleModalClose = () => {
  closeAllModals()
}

const switchVoteColor = (vote) => {
  if (vote >= 7) return "green"
  if (vote >= 5) return "yellow"
  return "red"
}

const handleMovieClick = (movie) => {
  openModal({
    size: "lg",
    children: (
      <>
        <CloseButton
          onClick={handleModalClose}
          size="md"
          m="xs"
          variant="filled"
          color="dark"
          sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
        />
        <Image
          src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          styles={(theme) => ({
            image: {
              aspectRatio: "16/8",
            },
            imageWrapper: {
              "&::after": {
                content: "''",
                backgroundImage: `linear-gradient(180deg, ${theme.fn.rgba(
                  theme.colors.dark[8],
                  0
                )} 0%, ${theme.fn.rgba(theme.colors.dark[8], 1)} 100%)`,
                position: "absolute",
                width: "100%",
                height: "100%",
                bottom: 0,
              },
            },
          })}
        />
        <Grid p="xl" gutter="lg" sx={{ position: "relative" }} mt={-60}>
          <Grid.Col span={12}>
            <Group position="apart" align="end" noWrap spacing="lg">
              <Title color="white" order={2}>
                {movie.title}
              </Title>
              <RingProgress
                size={70}
                thickness={5}
                roundCaps
                sections={[
                  {
                    value: (movie.vote_average / 10) * 100,
                    color: switchVoteColor(movie.vote_average),
                  },
                ]}
                label={
                  <Text
                    color={switchVoteColor(movie.vote_average)}
                    weight="bold"
                    align="center"
                    size="lg"
                  >
                    {movie.vote_average}
                  </Text>
                }
              />
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Image
              radius="sm"
              src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
              style={{ isolation: "isolate" }}
            />
          </Grid.Col>
          <Grid.Col span={9}>
            <Text size="md" weight="bold" mb="xs" color="white">
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
              })}
            </Text>
            <Spoiler
              pr="xl"
              maxHeight={75}
              showLabel={
                <Group spacing={2}>
                  <Text size="xs" weight="bold">
                    Show More
                  </Text>
                  <IconChevronDown size={16} />
                </Group>
              }
              hideLabel={
                <Group spacing={2}>
                  <Text size="xs" weight="bold">
                    Show Less
                  </Text>
                  <IconChevronUp size={16} />
                </Group>
              }
              styles={{
                control: {
                  color: "white",
                  "&:hover": { textDecoration: "none" },
                },
              }}
            >
              <Text size="md">{movie.overview}</Text>
            </Spoiler>
          </Grid.Col>
        </Grid>
      </>
    ),
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
            <UnstyledButton onClick={() => handleMovieClick(movie)}>
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
