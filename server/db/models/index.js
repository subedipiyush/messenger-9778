const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const { Group, UserGroup } = require("./group");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

Group.belongsToMany(User, { through: UserGroup });
User.belongsToMany(Group, { through: UserGroup });
Conversation.belongsTo(Group);

module.exports = {
  User,
  Conversation,
  Message,
  Group
};
