module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
        //modules: false,
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    [
      "module-resolver",
      {
        root: ["./src"]
      }
    ]
  ],
  env: {
    production: {
      only: ["src"],
      plugins: [
        [
          "transform-react-remove-prop-types",
          {
            removeImport: true
          }
        ],
        "@babel/plugin-transform-react-inline-elements",
        "@babel/plugin-transform-react-constant-elements"
      ]
    }
  }
};
