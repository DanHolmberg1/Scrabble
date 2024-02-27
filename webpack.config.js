const path = require('path');

module.exports = {
    mode: 'development', // or 'production'
    entry: './main.js', // Entry point of your application
    output: {
        filename: 'bundle.js', // Output bundle file name
        path: path.resolve(__dirname, 'dist') // Output directory
    },
    resolve: {
        fallback: {
            fs: false // or if needed, you can provide a polyfill or alternative module here
        }
    }
};
