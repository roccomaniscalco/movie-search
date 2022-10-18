import {
  CloseButton,
  Grid,
  Group,
  Image,
  RingProgress,
  Spoiler,
  Text,
  Title,
} from "@mantine/core"
import { IconChevronDown, IconChevronUp } from "@tabler/icons"
import { number, object, shape, string } from "prop-types"

const switchVoteColor = (vote) => {
  if (vote >= 7) return "green"
  if (vote >= 5) return "yellow"
  return "red"
}

const MovieModal = ({ context, id, innerProps }) => {
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
        src={`https://image.tmdb.org/t/p/w1280/${innerProps.movie.backdrop_path}`}
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
              {innerProps.movie.title}
            </Title>
            <RingProgress
              size={70}
              thickness={5}
              roundCaps
              sections={[
                {
                  value: (innerProps.movie.vote_average / 10) * 100,
                  color: switchVoteColor(innerProps.movie.vote_average),
                },
              ]}
              label={
                <Text
                  color={switchVoteColor(innerProps.movie.vote_average)}
                  weight="bold"
                  align="center"
                  size="lg"
                >
                  {innerProps.movie.vote_average}
                </Text>
              }
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={3}>
          <Image
            radius="sm"
            src={`https://image.tmdb.org/t/p/w342/${innerProps.movie.poster_path}`}
            style={{ isolation: "isolate" }}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <Text size="md" weight="bold" mb="xs" color="white">
            {new Date(innerProps.movie.release_date).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
              }
            )}
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
            <Text size="md">{innerProps.movie.overview}</Text>
          </Spoiler>
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
      poster_path: string.isRequired,
      backdrop_path: string.isRequired,
      title: string.isRequired,
      release_date: string.isRequired,
      vote_average: number.isRequired,
      overview: string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default MovieModal
