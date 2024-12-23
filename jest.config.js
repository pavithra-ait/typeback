module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.js$": "babel-jest", // Use Babel for JS files
  },
  transformIgnorePatterns: [
    "node_modules/(?!chai)" // Transform chai
  ],
};
