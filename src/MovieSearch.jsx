import {
  Autocomplete,
  Avatar,
  createStyles,
  Group,
  Stack,
  Text,
} from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { openContextModal } from "@mantine/modals"
import { IconMovieOff, IconSearch } from "@tabler/icons"
import { useQuery } from "@tanstack/react-query"
import { shape, string } from "prop-types"
import { forwardRef, useState } from "react"
import api from "~/api"

const useStyles = createStyles((theme, _params, getRef) => ({
  root: {
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      flex: 1,

      [`& .${getRef("input")}`]: {
        transition: "none",
        width: "100%",
        "&:focus": {
          width: "100%",
        },
      },
    },
  },

  input: {
    ref: getRef("input"),
    transition: "width 150ms ease",
    width: 180,
    "&:focus": {
      width: 320,
    },
  },
}))

const getVoteColor = (vote) => {
  if (vote >= 7) return "green"
  if (vote >= 5) return "yellow"
  return "red"
}

const MovieSearchResultsItem = forwardRef(({ movie, ...props }, ref) => {
  const voteColor = getVoteColor(movie.vote_average)
  const voteAsPercentage = movie.vote_average * 10
  const releaseYear = new Date(movie.release_date).toLocaleDateString("en-US", {
    year: "numeric",
  })

  return (
    <div ref={ref} {...props}>
      <Group noWrap spacing="xs">
        <Avatar
          radius="sm"
          alt={`${movie.title} poster`}
          src={
            movie.poster_path &&
            `https://image.tmdb.org/t/p/w92/${movie.poster_path}`
          }
        >
          <IconMovieOff />
        </Avatar>
        <Stack spacing={6} justify="center">
          <Text lineClamp={1} color="white" sx={{ lineHeight: 1 }}>
            {movie.title}
          </Text>
          <Group spacing="xs">
            <Text size="xs" weight="bold" color="dimmed" sx={{ lineHeight: 1 }}>
              {releaseYear}
            </Text>
            <Text size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
              •
            </Text>
            <Text
              size="xs"
              color={voteColor}
              weight="bold"
              sx={{ lineHeight: 1 }}
            >
              {voteAsPercentage}%
            </Text>
          </Group>
        </Stack>
      </Group>
    </div>
  )
})

const MovieSearch = () => {
  const { classes } = useStyles()
  const [inputValue, setInputValue] = useState("")
  const [debouncedInputValue] = useDebouncedValue(inputValue, 500)

  const { data: movieSearchResults } = useQuery(
    ["movies", debouncedInputValue],
    () => api.getMovieSearchResults(debouncedInputValue),
    {
      placeholderData: { results: [] },
      enabled: !!debouncedInputValue,
      keepPreviousData: true,
      select: (data) =>
        data.results.map((movie) => ({
          value: movie.id,
          movie: { ...movie },
        })),
    }
  )

  const handleMovieSearchResultsItemSubmit = (movieSearchResult) => {
    setInputValue(movieSearchResult.movie.title)
    openContextModal({
      modal: "movie",
      innerProps: {
        movie: movieSearchResult.movie,
      },
    })
  }

  return (
    <Autocomplete
      value={inputValue}
      onChange={setInputValue}
      onItemSubmit={handleMovieSearchResultsItemSubmit}
      data={inputValue ? movieSearchResults : []}
      filter={(_value, item) => item} // disable filtering since getMovieSearchResults already filters
      icon={<IconSearch size={16} />}
      itemComponent={MovieSearchResultsItem}
      classNames={classes}
      placeholder="Search movies"
      limit={10}
    />
  )
}

MovieSearchResultsItem.displayName = "MovieSearchResultsItem"
MovieSearchResultsItem.propTypes = {
  movie: shape({
    title: string.isRequired,
    poster_path: string,
  }).isRequired,
}

export default MovieSearch
