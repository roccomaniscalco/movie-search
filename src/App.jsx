import { AppShell, Stack } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import api from "~/api"
import AppHeader from "~/AppHeader"
import GenreMovieCarousel from "~/GenreMovieCarousel"
import MovieCarousel from "~/MovieCarousel"
import useCurrentBreakpoint from "~/useCurrentBreakpoint"

const CAROUSEL_BREAKPOINTS = [
  { maxWidth: "xl", slideSize: "12.5%" },
  { maxWidth: "lg", slideSize: "16.666%" },
  { maxWidth: "md", slideSize: "20%" },
  { maxWidth: "sm", slideSize: "25%" },
  { maxWidth: "xs", slideSize: "33.333%" },
]

const CAROUSEL_SLIDES_TO_SCROLL = {
  xxl: 10,
  xl: 8,
  lg: 6,
  md: 5,
  sm: 4,
  xs: 3,
}

const App = () => {
  const currentBreakpoint = useCurrentBreakpoint()
  const slidesToScroll = CAROUSEL_SLIDES_TO_SCROLL[currentBreakpoint]

  const { data: nowPlayingMovies } = useQuery(
    ["nowPlayingMovies"],
    api.getNowPlayingMovies
  )

  const { data: genres } = useQuery(["genres"], api.getGenres, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return (
    <AppShell header={<AppHeader />} padding={0}>
      <Stack spacing="xl" mb="xl" mt="xl">
        <MovieCarousel
          title="Now Playing"
          movies={nowPlayingMovies.results}
          slidesToScroll={slidesToScroll}
          breakpoints={CAROUSEL_BREAKPOINTS}
        />
        {genres.genres.map((genre) => (
          <GenreMovieCarousel
            genre={genre}
            slidesToScroll={slidesToScroll}
            breakpoints={CAROUSEL_BREAKPOINTS}
            key={genre.id}
          />
        ))}
      </Stack>
    </AppShell>
  )
}

export default App
