import { createStyles, Group, Header, Title } from "@mantine/core"
import { IconMovie } from "@tabler/icons"
import MovieSearch from "~/MovieSearch"

const useStyles = createStyles((theme) => ({
  title: {
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      display: "none",
    },
  }
}))

const AppHeader = () => {
  const { classes } = useStyles()

  return (
    <Header fixed height={64} px="md">
      <Group align="center" position="apart" sx={{ height: "100%" }}>
        <Group spacing="xs">
          <IconMovie color="white" size={28} />
          <Title
            order={2}
            color="white"
            transform="uppercase"
            sx={{ lineHeight: 1 }}
            className={classes.title}
          >
            moviebox
          </Title>
        </Group>
        <MovieSearch />
      </Group>
    </Header>
  )
}

export default AppHeader
