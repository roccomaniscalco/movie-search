import { Group, Header, Title } from "@mantine/core"
import { IconMovie } from "@tabler/icons"

const AppHeader = () => {
  return (
    <Header fixed height={64} px={32}>
      <Group align="center" sx={{ height: "100%" }} spacing="xs">
        <IconMovie color="white" size={28} />
        <Title order={2} color="white" transform="uppercase" sx={{ lineHeight: 1 }}>
          moviebox
        </Title>
      </Group>
    </Header>
  )
}

export default AppHeader
