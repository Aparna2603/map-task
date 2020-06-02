module.exports = (sequelize, types) => {
  const User = sequelize.define('user', {
    id:{
    type:types.INTEGER,
    primaryKey:true,
    },
    user_name: {
      type: types.STRING,
      allowNull: false,
    },
    latitude: {
      type: types.FLOAT,
    },
    longitude: {
      type: types.FLOAT,
    },
    inride:{
      type:types.BOOLEAN,
    }
  }, {
    tableName: 'user',
  });
  return User
}
