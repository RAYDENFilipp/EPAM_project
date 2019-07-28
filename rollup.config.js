import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
// import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import url from "rollup-plugin-url";
import buble from "rollup-plugin-buble";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance

      emitCss: false,

      css: css => {
        css.write("public/bundle.css");
      }
    }),

    postcss({
      plugins: [require("autoprefixer")],
      minimize: true
    }),

    url({
      limit: 10 * 1024, // inline files < 10k, copy files > 10k
      include: ["**/*.svg", "**/*.jpg"], // defaults to .svg, .png, .jpg and .gif files
      emitFiles: true, // defaults to true
      fileName: "[dirname][name][extname]"
    }),

    buble({
      exclude: ["node_modules/@babel/**", "node_modules/core-js/**"],
      transforms: { asyncAwait: false }
    }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === "svelte" || importee.startsWith("svelte/")
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // compile to good old IE11 compatible ES5
    // babel({
    //     extensions: [".js", ".mjs", ".html", ".svelte"],
    //     runtimeHelpers: true,
    //     exclude: ["node_modules/@babel/**", "node_modules/core-js/**"],
    //     presets: [
    //         [
    //             "@babel/preset-env",
    //             {
    //                 targets: "> 1%",
    //                 useBuiltIns: "usage",
    //                 corejs: 3
    //             }
    //         ]
    //     ],
    //     plugins: [
    //         "@babel/plugin-syntax-dynamic-import",
    //         [
    //             "@babel/plugin-transform-runtime",
    //             {
    //                 useESModules: true
    //             }
    //         ]
    //     ]
    // }),
    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
