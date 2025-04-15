import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import { obfuscator } from "rollup-obfuscator";
import terser from "@rollup/plugin-terser";

export default [
  {
    input: "index.ts",
    output: {
      file: "dist/sdk.js",
      format: "esm",
      name: "MySDK",
    },
    plugins: [
      typescript(),
      terser({ mangle: { reserved: ["MySDK", "message"] } }),
      resolve(),
      obfuscator({
        reservedStrings: ["MySDK"],
        stringArray: true,
        stringArrayThreshold: 1,
        simplify: true,
        compact: true,
        splitStrings: true,
      }),
    ],
  },
];
