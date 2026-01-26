import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js', '.png'],
    alias: {
      '@': options.paths.src
    }
  }
};