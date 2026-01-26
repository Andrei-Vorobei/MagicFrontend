import { ModuleOptions, runtime } from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { BuildOptions } from "./types/types";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoders(options: BuildOptions):ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader:'@svgr/webpack',
        options: {
          icon: true
        }
      }
    ],
  };

  const cssLoaderWithModules = {
    loader: "css-loader",
    // options: {
    //   modules: {
    //     localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
    //   },
    // },
  };

  const scssLoader = {
    test: /\.s?[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: {
      getCustomTransformers: () => ({
        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
      }),
      transpileOnly: isDev
    },
    exclude: /node_modules/,
  };

  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][ext]' // Шрифты будут в папке dist/fonts/
    }
  };

  const babelLoader = buildBabelLoader(options);

  return [
    assetsLoader,
    fontsLoader,
    scssLoader,
    // tsLoader,
    babelLoader,
    svgLoader,
  ];
}