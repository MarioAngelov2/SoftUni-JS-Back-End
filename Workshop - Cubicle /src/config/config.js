const config = {
  production: {
    PORT: 1234,
  },
  development: {
    PORT: 2000,
  },
};

module.exports = config[process.env.node_env || "development"];
