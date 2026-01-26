import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildOptions, BuildPaths, BuildPlatform } from './config/build/types/types';

interface EnvVaribles {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}

export default (env: EnvVaribles) => {

  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
  };

  const options: BuildOptions = {
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  };

  const config: webpack.Configuration = buildWebpack(options);

  return config;
}