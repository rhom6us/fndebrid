
const HtmlWebpackPlugin = require('html-webpack-plugin');


function addChunk(configuration, entry, renderer, addHtmlFile)  {
  configuration.entry[entry] = [
     "css-hot-loader/hotModuleReplacement",
    `./src/renderer/${renderer}`
   ]
  ;

  if (addHtmlFile) {
    configuration.plugins.push(new HtmlWebpackPlugin({
      "template": "!!html-loader?minimize=false&url=false!dist\\.renderer-index-template.html",
      "filename": `${entry}.html`,
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": [ entry],
      "excludeChunks": [],
      "chunksSortMode": "auto",
      "meta": {},
      "title": `Chunk ${entry}`,
      "xhtml": false,
      "nodeModules": "node_modules"
    }));
  }
}



// addChunk("theme", "theme.ts", false);
// addChunk("app", "index.tsx", true);
// addChunk("login", "login.tsx", true);

// module.exports = configuration;

module.exports = function(context) {
  // Fix filename clash in MiniCssExtractPlugin
  context.plugins.forEach((plugin) => {
      if (plugin.constructor.name === "MiniCssExtractPlugin") {
          plugin.options.filename = '[id].styles.css';
          plugin.options.moduleFilename = (name) => {
              return '[id].styles.css';
          };
      }
  });

  // Add entrypoint for second renderer
  //context.entry.secondRenderer = ['./src/renderer/second-renderer.js'];
  //addChunk(context, 'debug', 'debug.tsx', false);
  return context;
};
//