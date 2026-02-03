import { lazy, Suspense } from "react";
import { App } from "./components/App";
import { RouteObject } from "react-router";

const LazyMagicFrontend = lazy(() => import('./pages/MagicFrontend'));
const LazyJSTaskes = lazy(() => import('./pages/JSTaskes'));

export const getRoutes = (): RouteObject[] => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Suspense fallback='Loading...'><LazyMagicFrontend /></Suspense>
        },
        {
          path: '/about',
          element: <Suspense fallback='Loading...'><LazyJSTaskes /></Suspense>
        },
        {
          path: '*',
          element: <Suspense fallback='Loading...'><LazyMagicFrontend /></Suspense>
        },
      ]
    },
  ];

  return routes;
};
