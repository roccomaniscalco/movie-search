import { MantineProvider } from "@mantine/core"
import { node } from "prop-types"

const ThemeProvider = ({ children }) => {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      {children}
    </MantineProvider>
  )
}

ThemeProvider.propTypes = {
  children: node,
}

export default ThemeProvider
