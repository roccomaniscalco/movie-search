import {
  Badge,
  CloseButton,
  Grid,
  Group,
  Image,
  Progress,
  Spoiler,
  Text,
  Title,
} from "@mantine/core"
import { IconChevronDown, IconChevronUp, IconMovieOff } from "@tabler/icons"
import { useQuery } from "@tanstack/react-query"
import { number, object, shape, string } from "prop-types"
import api from "~/api"

const getVoteColor = (vote) => {
  if (vote >= 7) return "green"
  if (vote >= 5) return "yellow"
  return "red"
}

const MovieModal = ({ context, id, innerProps }) => {
  const { movie } = innerProps

  const { data: genres } = useQuery(["genres"], api.getGenres, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data) =>
      data.genres.filter((genre) => movie.genre_ids.includes(genre.id)),
  })

  const voteColor = getVoteColor(movie.vote_average)
  const voteAsPercentage = movie.vote_average * 10
  const releaseYear = new Date(movie.release_date).toLocaleDateString("en-US", {
    year: "numeric",
  })

  return (
    <>
      <CloseButton
        onClick={() => context.closeModal(id)}
        size="md"
        m="xs"
        variant="filled"
        color="dark"
        sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
      />

      <Image
        src={
          movie.backdrop_path &&
          `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`
        }
        alt={`${movie.title} backdrop`}
        withPlaceholder
        placeholder={<IconMovieOff size={64} />}
        styles={(theme) => ({
          image: {
            aspectRatio: "16/8",
          },
          imageWrapper: {
            "&::after": {
              content: "''",
              position: "absolute",
              bottom: 0,
              height: "100%",
              width: "100%",
              backgroundImage: `linear-gradient(180deg, 
                ${theme.fn.rgba(theme.colors.dark[8], 0)}, 
                ${theme.fn.rgba(theme.colors.dark[8], 1)})`,
            },
          },
        })}
      />

      <Grid p="xl" gutter="xl" mt={-30} sx={{ position: "relative" }}>
        <Grid.Col span={12}>
          <Title color="white" order={2}>
            {movie.title}
          </Title>
        </Grid.Col>

        <Grid.Col span={2}>
          <Image
            src={
              movie.poster_path &&
              `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
            }
            alt={`${movie.title} poster`}
            withPlaceholder
            placeholder={<IconMovieOff size={32} />}
            radius={movie.poster_path ? "sm" : 0}
          />
        </Grid.Col>

        <Grid.Col span={7}>
          <Group mb="sm" spacing="sm">
            <Text weight="bold" color="white" sx={{ lineHeight: 1 }}>
              {releaseYear}
            </Text>
            <Text color="dimmed" sx={{ lineHeight: 1 }}>
              •
            </Text>
            <Text color={voteColor} weight="bold" sx={{ lineHeight: 1 }}>
              {voteAsPercentage}%
            </Text>
            <Progress
              value={voteAsPercentage}
              color={voteColor}
              radius="xl"
              sx={{ maxWidth: 100, width: "100%" }}
            />
          </Group>
          <Spoiler
            maxHeight={102}
            showLabel={
              <Group spacing={4}>
                <Text size="xs" weight="bold" transform="uppercase">
                  Show More
                </Text>
                <IconChevronDown size={18} />
              </Group>
            }
            hideLabel={
              <Group spacing={4}>
                <Text size="xs" weight="bold" transform="uppercase">
                  Show Less
                </Text>
                <IconChevronUp size={18} />
              </Group>
            }
            styles={{
              control: {
                color: "white",
                "&:hover": { textDecoration: "none" },
              },
            }}
          >
            <Text>{movie.overview}</Text>
          </Spoiler>
        </Grid.Col>

        <Grid.Col span={3}>
          <Group spacing="xs">
            {genres.map((genre) => (
              <Badge key={genre.id} size="sm" variant="filled">
                {genre.name}
              </Badge>
            ))}
          </Group>
        </Grid.Col>
      </Grid>
    </>
  )
}

MovieModal.propTypes = {
  context: object.isRequired,
  id: string.isRequired,
  innerProps: shape({
    movie: shape({
      id: number.isRequired,
      poster_path: string,
      backdrop_path: string,
      title: string.isRequired,
      release_date: string.isRequired,
      vote_average: number.isRequired,
      overview: string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default MovieModal
