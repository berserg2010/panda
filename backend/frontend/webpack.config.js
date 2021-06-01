const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');


module.exports = ({ debug = 'false', watch = 'false' }) => {

  debug = JSON.parse(debug.toLowerCase());
  watch = JSON.parse(watch.toLowerCase()) && debug;

  console.info(`Debug: ${debug}`);

  const mode = debug ? 'development' : 'production';

  return {
    watch: watch,
    watchOptions: {
      aggregateTimeout: 600,
      poll: 1000,
    },
    mode:  mode,
    context: path.join(__dirname),
    entry: {
      index: `${srcPath}/js/index.js`,
      main_public: `${srcPath}/js/main_public.js`,
      main_private: `${srcPath}/js/main_private.js`,
      video_chat: `${srcPath}/js/components/video_chat.js`,
    },
    output: {
      filename: 'js/[name].js',
      path: distPath,
    },
    module: {
      rules: [
        // JS
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
          ],
        },
        // Vue
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        // SCSS/CSS
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                url: false,
                sourceMap: true,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            }
          ],
        },
        // IMG
        {
          // test: /\.(jpg|png|svg)$/,
          test: /\.(jpg|png)$/,
          use: [{
            loader: 'file-loader',
            options: {
              limit: 100000,
              outputPath: 'img',
              name: '[name]-[sha1:hash:7].[ext]',
            },
          }]
        },
        //SVG
        {
          test: /\.svg$/,
          use: [
            'vue-loader',
            'vue-svg-loader',
          ],
        },
        // Fonts
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: [{
            loader: 'file-loader',
            options: {
              limit: 100000,
              outputPath: 'fonts',
              name: '[name].[ext]',
            },
          }]
        },
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        // `...`,
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/main.css',
      }),
      new CopyPlugin({
        patterns: [
          {from: `${srcPath}/fonts`, to: `${distPath}/fonts`},
          {from: `${srcPath}/img`, to: `${distPath}/img`},
        ],
      }),
      require('autoprefixer'),
    ],
    resolve: {
      alias: {
        'vue3-perfect-scrollbar': path.resolve(__dirname, 'node_modules/vue3-perfect-scrollbar'),
      }
    },
  }
};
