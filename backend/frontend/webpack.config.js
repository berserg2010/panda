const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');


module.exports = ({ debug = 'false' }) => {

  const mode = [ 'true', '1' ].includes(debug) ? 'development' : 'production'

  return {
    entry: './index.js',
    mode:  mode,
    output: {
      filename: 'js/main.js',
      // path: distPath,
      path: `${distPath}`,
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
          test: /\.(jpg|png|svg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              limit: 100000,
              outputPath: 'img',
              name: '[name]-[sha1:hash:7].[ext]',
            },
          }]
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
      new MiniCssExtractPlugin({
        filename: 'css/main.css',
      }),
      new CopyPlugin({
        patterns: [
          {from: `${srcPath}/fonts`, to: `${distPath}/fonts`},
          {from: `${srcPath}/img`, to: `${distPath}/img`},
          // {from: `${srcPath}/js`, to: `${distPath}/js`},
        ],
      }),
      require('autoprefixer'),
    ],
  }
};
