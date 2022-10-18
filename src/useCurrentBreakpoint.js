import { useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

export default function useCurrentBreakpoint() {
  const theme = useMantineTheme()
  const lessThanXs = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`)
  const lessThanSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
  const lessThanMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)
  const lessThanLg = useMediaQuery(`(max-width: ${theme.breakpoints.lg}px)`)
  const lessThanXl = useMediaQuery(`(max-width: ${theme.breakpoints.xl}px)`)

  if (lessThanXs) return "xs"
  if (lessThanSm) return "sm"
  if (lessThanMd) return "md"
  if (lessThanLg) return "lg"
  if (lessThanXl) return "xl"
  return "xxl"
}
