import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { node } from "prop-types"

const ThemeProvider = ({ children }) => {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{ colorScheme: "dark" }}
    >
      <ModalsProvider
        modalProps={{
          padding: 0,
          withCloseButton: false,
          styles: (theme) => ({
            modal: {
              overflow: "hidden",
              backgroundColor: theme.colors.dark[8],
            },
          }),
        }}
      >
        {children}
      </ModalsProvider>
    </MantineProvider>
  )
}

ThemeProvider.propTypes = {
  children: node,
}

export default ThemeProvider
