module.exports = {
    presets: [
      ["@babel/react", { runtime: 'automatic'}],
      "@babel/typescript",
      ["@babel/preset-env", { "modules": false }]
    ]
}
