const Sequelize = require("sequelize");
const db = require("../db");

const Group = db.define("group", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  iconUrl: {
    type: Sequelize.STRING
  }
});

// association
const UserGroup = db.define("userGroup", {
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

module.exports = {Group, UserGroup};
