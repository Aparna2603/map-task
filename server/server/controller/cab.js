
const model = require('../db/db.js');
const Cab = model.Cab;

// Get the Available cabs in the app
exports.getCabs = (req, res) => {
    console.log("-------------------called this method----------------------------");
  Cab.findAll({
  where: {
    available:true
    }
  }).then( data => res.send(data) )

};
//Get the history of  particular details about  one cab in the table
exports.cabHistory=(req, res)=>{
    console.log("-------------------get the history  of the cab ride history----------------------------",req.body.id);
      Cab.findOne({
        where: {
          id: req.body.id
        },
        attributes: ['cab_name','latitude','longitude','ridehistory','available']
      }).then( data => res.send(data) )
}



//Book the cab for travel

exports.cabBook = (req, res) => {
  console.log('-book cab----------------------', req.body.id);
  Cab.findOne({
    where: {
        id: req.body.id
    }
  }).then(data => {
    Cab.update({
      available:false
    }, {
      where: {
        id: data.id
      }
    });
    return res.send(data);
  })
}


//Unbook the cabBook
exports.cabUnbook = (req, res) => {
  console.log('unbook cab----------------------', req.body.id);
  Cab.findOne({
    where: {
        id: req.body.id
    }
  }).then(data => {
    Cab.update({
      available:true
    }, {
      where: {
        id: data.id
      }
    });
    return res.status(200).send({
      data: data
    })
  })
}
