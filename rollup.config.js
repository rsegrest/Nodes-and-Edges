// See also: https://rollupjs.org/
// import commonjs from '@rollup/plugin-commonjs';

// import replace from '@rollup/plugin-replace';

const banner = `/**
 * This is a p5.js sketch made with p5js-template-petr-plus.
 *
 * @license CC0-1.0
 */
`;

const config = {
  input: "tsc-out/main.js",
  output: {
    file: "dist/script.js",
    format: "iife",
    banner,
    globals: { p5: "p5" },
    interop: "default",

    // commonjs: {
    //   include: 'node_modules/**',
    //   requireReturnsDefault: 'auto', // <---- this solves default issue
    // }
  },
  external: ["p5"],
};

export default config;
