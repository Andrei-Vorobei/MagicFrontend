import { FunctionComponent, JSX } from "react";

export type RoutType = {
  path: string;
  element: JSX.Element;
  ErrorBoundary?: FunctionComponent;
  children?: RoutType[];
}
