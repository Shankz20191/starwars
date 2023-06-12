import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomeLayout from "./pages/HomeLayout";
import Landing from "./pages/Landing";
import People from "./pages/People";
import Films from "./pages/Films";
import Planet from "./pages/Planet";
import Species from "./pages/Species";
import Starship from "./pages/Starship";
import Vehicle from "./pages/Vehicle";

import { loader as filmsLoader } from "./pages/Films";
import { loader as landingLoader } from "./pages/Landing";
import { loader as peopleLoader } from "./pages/People";
import { loader as planetLoader } from "./pages/Planet";
import { loader as speciesLoader } from "./pages/Species";
import { loader as starshipLoader } from "./pages/Starship";
import { loader as vehicleLoader } from "./pages/Vehicle";
import { loader as searchLoader } from "./pages/Search";
import Search from "./pages/Search";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
      },
      {
        path: "/people/:id",
        element: <People />,
        loader: peopleLoader(queryClient),
      },
      {
        path: "/films/:id",
        element: <Films />,
        loader: filmsLoader(queryClient),
      },
      {
        path: "/planet/:id",
        element: <Planet />,
        loader: planetLoader(queryClient),
      },
      {
        path: "/species/:id",
        element: <Species />,
        loader: speciesLoader(queryClient),
      },
      {
        path: "/starship/:id",
        element: <Starship />,
        loader: starshipLoader(queryClient),
      },
      {
        path: "/search/:searchParam",
        element: <Search />,
        loader: searchLoader(queryClient),
      },
      {
        path: "/vehicle/:id",
        element: <Vehicle />,
        loader: vehicleLoader(queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
