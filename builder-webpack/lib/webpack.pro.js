import { merge } from 'webpack-merge';
import webpackBase from 'webpack.base';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import cssnano from "cssnano";
import htmlWebpackExternalsPlugin from 'html-webpack-externals-plugin';

module.exports = merge(webpackBase, {
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    mode: 'production',
    plugins: [
        new TerserPlugin({}),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true,
                },
                // Run cssnano in safe mode to avoid
                // potentially unsafe transformations.
                safe: true,
            },
            canPrint: true,
        }),
        new htmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://unpkg.com/react@16.13.1/umd/react.production.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js',
                    global: 'ReactDom',
                }
            ]
        })
    ]
});