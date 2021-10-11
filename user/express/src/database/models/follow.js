module.exports = (sequelize, DataTypes) =>
  sequelize.define("follow", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
  });
