import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
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
    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
