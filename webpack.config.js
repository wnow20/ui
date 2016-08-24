module.exports = {
    // entry point of our application
    entry: './example/pagination.js',
    // where to place the compiled bundle
    output: {
        path: __dirname + '/example/',
        filename: 'pagination-bundle.js'
    },
    module: {
        // `loaders` is an array of loaders to use.
        // here we are only configuring vue-loader
        loaders: [
            {
                test: /\.vue$/, // a regex for matching all files that end in `.vue`
                loader: 'vue' // loader to use for matched files
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    // if you are using babel-loader directly then
    // the babel config block becomes required.
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
}
