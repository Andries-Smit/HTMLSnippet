const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");

const package = require("./package");
const widgetName = package.name;
const widgetNameContext = widgetName + "Context";
const widgetVersion = package.version;

module.exports = {
    entry: {
        [widgetName]: [ "core-js/es6/promise", `./src/${widgetName}/widget/${widgetName}.js` ],
        [widgetNameContext]: [ "core-js/es6/promise", `./src/${widgetName}/widget/${widgetNameContext}.js` ],
    },
    output: {
        path: path.resolve(__dirname, "dist/tmp/src"),
        filename: `${widgetName}/widget/[name].js`,
        chunkFilename: `${widgetName}/widget/${widgetName}[id].js`,
        libraryTarget: "amd",
        publicPath: "widgets/"
    },
    devtool: "source-map",
    externals: [ /^mxui\/|^mendix\/|^dojo\/|^dijit\// ],
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new CleanWebpackPlugin([ "dist/tmp" ]),
        new CopyWebpackPlugin([ {context: "src", from: "**/*.xml", debug: true} ], { copyUnmodified: true }),
        new ZipPlugin({ path: `../../${widgetVersion}`, filename: widgetName, extension: "mpk" })
    ]
};
