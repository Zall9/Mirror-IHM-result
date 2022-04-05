const { alias, aliasJest } = require("react-app-rewire-alias");

const aliasMap = {
  // "@": "./src/",
  "@components": "./src/components/",
  "@pages": "./src/pages",
  "@services": "./src/services/",
  "@stores": "./src/services/stores/",
};

module.exports = alias(aliasMap);
module.exports.jest = aliasJest(aliasMap);
