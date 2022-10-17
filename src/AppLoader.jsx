import { Center, Loader, Text } from "@mantine/core"
import React from "react"

const AppLoader = () => {
  return (
    <Center sx={{ height: "100vh", flexDirection: "column" }}>
      <Loader size="xl" variant="bars" />
      <Text mt="xl" size="lg" weight="bold">Preparing movies...</Text>
    </Center>
  )
}

export default AppLoader
