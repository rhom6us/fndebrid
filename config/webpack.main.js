
const Dotenv = require('dotenv-webpack');


module.exports = function (context) {
  context.plugins.push(new Dotenv());
  
  return context;
};
