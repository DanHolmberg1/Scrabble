const path = require('path');

module.exports = {
    entry: './main.js', // Entry point of your application
    output: {
        filename: 'bundle.js', // Output bundle file name
        path: path.resolve(__dirname, 'dist') // Output directory
    }
};
