const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  devtool: "cheap-module-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "assets/js/[name].[contenthash:8].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: "development"
          }
        }
      },
      {
        // for webworker
        test: /\.worker\.js$/,
        loader: "worker-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.module.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "static/media/[name].[hash:8].[ext]"
          }
        }
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: require.resolve("file-loader"),
        options: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve("./src"), path.resolve("./node_modules")]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      inject: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: "service-worker.js",
      clientsClaim: true,
      skipWaiting: true
    })
  ].filter(Boolean),
  optimization: {
    minimize: false,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            comments: false,
            ascii_only: true
          },
          warnings: false
        }
      }),
      new OptimizeCssAssetsPlugin()
    ],
    splitChunks: {
      chunks: "all",
      minSize: 0,
      maxInitialRequests: 10,
      maxAsyncRequests: 10,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `${cacheGroupKey}.${packageName.replace("@", "")}`;
          }
        },
        common: {
          minChunks: 2,
          priority: -10
        }
      }
    },
    runtimeChunk: "single"
  },
  devServer: {
    contentBase: "./src",
    compress: true,
    historyApiFallback: true,
    open: true,
    overlay: true,
    port: 3000
  }
};
