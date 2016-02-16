module.exports = {
    context: __dirname + "/src",
    entry: "./demo",

    output: {
        path: __dirname + "/public/dist",
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: []
                }
            }
        ]
    },

    devtool: "source-map"
};