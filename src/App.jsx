import { Carousel } from "@mantine/carousel"
import { Center, Image, Loader, TextInput, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import api from "~/api"

const App = () => {
  const { data: nowPlayingMovies } = useQuery(
    ["nowPlayingMovies"],
    api.getNowPlayingMovies
  )
  console.log(nowPlayingMovies)

  if (!nowPlayingMovies) return <Loader />

  return (
    <>
      <Center m="xl">
        <TextInput
          placeholder="Search all movies..."
          size="xl"
          sx={{ width: "70%" }}
        />
      </Center>
      <Title order={2} mx="md" mb="xs">
        Now Playing
      </Title>
      <Carousel
        mx="md"
        slideGap="md"
        slideSize="10%"
        withIndicators
        breakpoints={[
          { maxWidth: "xl", slideSize: "12.5%" },
          { maxWidth: "lg", slideSize: "16.666%" },
          { maxWidth: "md", slideSize: "20%" },
          { maxWidth: "sm", slideSize: "33.333%", slideGap: "xs" },
        ]}
        loop
        align="start"
      >
        {nowPlayingMovies.results.map((movie) => (
          <Carousel.Slide key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  )
}

export default App
