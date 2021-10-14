module.exports = (sequelize, DataTypes) =>
  sequelize.define("usage", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY, 
      defaultValue: DataTypes.NOW
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalTimeSpent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    lastLogin: {
      type: DataTypes.DATE, 
      allowNull: false
    }
  }, {
    timestamps: false,
  });
