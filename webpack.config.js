module.exports = ( env, argv ) => {

    let config = {
        entry: './src/index.ts',
        output: {
            filename: 'bundle.js',
            path: __dirname + '/dist/js/'
        },
        resolve: {
            // add '.ts' and '.tsx' as resolvable extensions.
            extensions: [
                '.ts',
                '.tsx',
                '.js',
                '.json'
            ]
        },
    };

    // enable sourcemaps for debugging webpack's output.
    if ( argv.mode === 'development' ) {
        config.devtool = 'source-map';
    }

    config.module = {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },

            // all output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            },

            // all '.css' files will be handled by the style- and css-loader
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },

            // all '.less' files will be handled by the style- and css-loader
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            relativeUrls:      false,
                            sourceMap:         true,
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ],
    };

    if ( argv.mode === 'production' ) {
        config.optimization = {
            minimize: true
        };
    }

    config.devServer = {
        host: 'localhost',
        port: 1234,
        watchContentBase: true,
        publicPath: '/js/',
        contentBase: __dirname + '/dist/'
    };

    return config;
};
