const webpack = require("webpack");
const isDev = process.env.NODE_ENV === "development";
const buildingDemos = process.env.BUILD_TYPE === "demos";
const buildingPlugin = process.env.NODE_ENV === "production" && !buildingDemos;
const buildDirectory = buildingDemos ? "public-demos" : "dist";

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/vue2-editor.scss";
        `,
        module: true
      }
    }
  },

  // css: {
  //   extract: {
  //     filename: "[name].css", // to have a name related to a theme
  //     chunkFilename: "css/[name].css"
  //   },
  //   modules: false,
  //   sourceMap: true
  // },

  outputDir: buildDirectory,

  configureWebpack: config => {
    if (isDev || buildingDemos) {
      config.plugins.push(
        new webpack.ProvidePlugin({
          "window.Quill": "quill/dist/quill.js",
          Quill: "quill/dist/quill.js"
        })
      );
    }
  },

  chainWebpack: config => {
    if (buildingPlugin) {
      config.externals({
        quill: "quill"
      });
    }
    // config
    //   .entry("theme") // you can add here as much themes as you want
    //   .add("./src/assets/vue2-editor.scss")
    //   .end();
  }
};
