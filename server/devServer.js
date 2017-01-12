const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack/webpack.config.dev');

new WebpackDevServer(webpack(config), {
  quiet: true,
  publicPath: config.output.publicPath,
  hot: true,
  stats: {
    colors: true
  },
  historyApiFallback: {
    index: 'src/html/index.dev.html'
  }
}).listen(8080, '0.0.0.0', function(err) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:8080/');
});
