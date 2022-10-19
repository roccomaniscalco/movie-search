import { Group, Header, Title } from "@mantine/core"
import { IconMovie } from "@tabler/icons"
import MovieSearch from "~/MovieSearch"

const AppHeader = () => {
  return (
    <Header fixed height={64} px={32}>
      <Group align="center" position="apart" sx={{ height: "100%" }}>
        <Group spacing="xs">
          <IconMovie color="white" size={28} />
          <Title
            order={2}
            color="white"
            transform="uppercase"
            sx={{ lineHeight: 1 }}
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
