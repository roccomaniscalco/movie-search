import { Carousel } from "@mantine/carousel"
import { Center, Image, Loader, TextInput, Title } from "@mantine/core"
import { IconSearch } from "@tabler/icons"
import { useQuery } from "@tanstack/react-query"
import api from "~/api"
import useCurrentBreakpoint from "~/useCurrentBreakpoint"

const BREAKPOINT_MAP_SLIDES_TO_SCROLL = {
  xs: 3,
  sm: 4,
  md: 5,
  lg: 6,
  xl: 8,
  xxl: 10,
}

const App = () => {
  const breakpoint = useCurrentBreakpoint()
  const { data: nowPlayingMovies } = useQuery(
    ["nowPlayingMovies"],
    api.getNowPlayingMovies
  )

  if (!nowPlayingMovies)
    return (
      <Center sx={{ height: "100vh" }}>
        <Loader variant="bars" size="xl" />
      </Center>
    )

  return (
    <>
      <TextInput
        icon={<IconSearch />}
        placeholder="Search for a movie..."
        size="lg"
        radius="xl"
        m="xl"
        p="xl"
        autoFocus
      />

      <Title order={3} mx="md" mb="xs">
        Now Playing
      </Title>

      <Carousel
        slidesToScroll={BREAKPOINT_MAP_SLIDES_TO_SCROLL[breakpoint]}
        styles={{ viewport: { borderRadius: 4 } }}
        loop
        align="start"
        mx="md"
        slideGap="sm"
        slideSize="10%"
        breakpoints={[
          { maxWidth: "xl", slideSize: "12.5%" },
          { maxWidth: "lg", slideSize: "16.666%" },
          { maxWidth: "md", slideSize: "20%" },
          { maxWidth: "sm", slideSize: "25%" },
          { maxWidth: "xs", slideSize: "33.333%" },
        ]}
      >
        {nowPlayingMovies.results.map((movie) => (
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

export default App
