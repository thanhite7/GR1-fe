const webpack = require('webpack');

module.exports = {
    // other configuration settings...
    resolve: {
      fallback: {
        "crypto": false,  // Add this line to disable crypto
        "stream": false,  // Add this line to disable stream
      },
    },
  };
  