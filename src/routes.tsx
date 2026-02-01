import { Suspense } from "react";
import { RoutType } from "./types/globalTypes";
import { App } from "./components/App";
import { MagicFrontend } from "./pages/MagicFrontend";


export const getRoutes = (): RoutType[] => {

  const routes: RoutType[] = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: '/magic-frontend',
          element: <Suspense fallback='Loading...'><MagicFrontend /></Suspense>
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