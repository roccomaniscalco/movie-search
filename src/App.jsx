import { Center, TextInput } from "@mantine/core"

const App = () => {
  return (
    <Center m="xl">
      <TextInput
        placeholder="Search all movies..."
        size="xl"
        sx={{ width: "70%" }}
      />
    </Center>
  )
}

export default App
