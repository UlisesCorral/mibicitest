const { getStationsService } = require("../services/stations.service")

async function getStationsByCloser(req, res, next) {
    try {
        const { latitude, longitude, radius } = req.query;

        const stations = await getStationsService(latitude, longitude, radius);

        if (stations.length > 0) {
            res.status(200).json({ success: true, error: "", data: { stations } })
        } else {
            res.status(400).json({ success: false, error: "The station wasn't found", data: null })
        }
    } catch (err) {
        next(err);
    }
}

module.exports = getStationsByCloser