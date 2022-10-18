import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import App from "~/App"
import AppLoader from "~/AppLoader"
import MovieModal from "~/MovieModal"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ colorScheme: "dark" }}
      >
        <ModalsProvider
          modals={{ movie: MovieModal }}
          modalProps={{
            padding: 0,
            withCloseButton: false,
            size: "xl",
            styles: (theme) => ({
              modal: {
                backgroundColor: theme.colors.dark[8],
              },
            }),
          }}
        >
          <Suspense fallback={<AppLoader />}>
            <App />
          </Suspense>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
