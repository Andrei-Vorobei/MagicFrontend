import './styles/global.css';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { getRoutes } from "./routes";

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

const router = createBrowserRouter(getRoutes());

container.render(<RouterProvider router={router} />);
