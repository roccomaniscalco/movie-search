import { useMantineTheme } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"

export default function useCurrentBreakpoint() {
  const theme = useMantineTheme()
  const { width: viewportWidth } = useViewportSize()

  const breakpointsAsEntries = Object.entries(theme.breakpoints)

  return breakpointsAsEntries.find(
    ([, width]) => width > viewportWidth
  )?.[0] || "xxl"
}
