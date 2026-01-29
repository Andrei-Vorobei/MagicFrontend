import { Suspense } from "react";
import { RoutType } from "./types/globalTypes";
import { App } from "./components/App";
import { HomePage } from "./pages/HomePage";


export const getRoutes = (): RoutType[] => {

  const routes: RoutType[] = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: '/home',
          element: <Suspense fallback='Loading...'><HomePage /></Suspense>
        },
        {
          path: '/about',
          element: <Suspense fallback='Loading...'><div>ABOUT</div></Suspense>
        },
      ]
    },
  ];

  return routes;
}