import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import App from "~/App"
import AppLoader from "~/AppLoader"
import ThemeProvider from "~/ThemeProvider"

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
      <ThemeProvider>
        <Suspense fallback={<AppLoader />}>
          <App />
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
