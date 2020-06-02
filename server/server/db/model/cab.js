module.exports = (sequelize, types) => {
  const Cab = sequelize.define('cab', {
    id:{
    type:types.INTEGER,
    primaryKey:true,
    },
    cab_name: {
      type: types.STRING,
      allowNull: false,
    },
    latitude: {
      type: types.DOUBLE,
    },
    longitude: {
      type: types.DOUBLE,
    },
   available: {
  type: types.BOOLEAN,
  allowNull: false,
  defaultValue: true
   },
  ridehistory:{
  type:types.INTEGER,
  },

},


 {
    tableName: 'cab',
  });
  return Cab;
}
