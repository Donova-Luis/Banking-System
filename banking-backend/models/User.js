// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    accountBalance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  }, {
    tableName: 'Users'
  });

  User.associate = (models) => {
    User.hasMany(models.Transaction, { foreignKey: 'userId' });
  };

  return User;
};
