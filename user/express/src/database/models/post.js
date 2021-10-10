module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rootId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    imageURL: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    isContentEdited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isContentDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isAuthorDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    timestamps: true,
    createdAt: 'postedDate',
    updatedAt: 'editedDate'
  });
