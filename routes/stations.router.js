const {Router} = require('express')
const getStationsByCloser = require('../controllers/getStationsByCloser.controller.js')

function stationsRouter(app) {

    const router = Router();
    
    app.use('/api/stations', router);

    router.get('/stations', getStationsByCloser);

}

module.exports = {stationsRouter}