import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "@/components/App/App";

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/about',
        element: <Suspense fallback='Loading...'><div>ABOUT</div></Suspense>
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback='Loading...'><div>SHOP</div></Suspense>
        )
      }
    ]
  },
]);

container.render(<RouterProvider router={router} />);