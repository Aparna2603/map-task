const cabcontrol = require('./controller/cab');
var cors = require('cors')
var Router = require('router')
var router = new Router();

router.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id'],
  }),
);


router.get('/cabs/get', cabcontrol.getCabs);
router.put('/rides/get', cabcontrol.cabHistory);
router.put('/book/', cabcontrol.cabBook);
router.put('/unbook/', cabcontrol.cabUnbook);



module.exports = router;
