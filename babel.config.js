const isDev = process.env.NODE_ENV != "production";

const presetEnv = [
  "@babel/preset-env", {
    // modules: false,
    debug: false,
    // useBuiltIns: "usage",
    // shippedProposals: true,
  }
];
module.exports = {
  presets: [presetEnv],
  plugins: ["react-hot-loader/babel"]
}