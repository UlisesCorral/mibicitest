const {pool} = require('../bd/pool')

async function getStationsService(latitude, longitude, radius){
        try {

            const query = {
                text: `SELECT *
                        FROM stations
                        WHERE earth_distance(
                            ll_to_earth($1, $2), 
                            ll_to_earth(latitude, longitude)
                        ) <= $3`,
                values: [latitude, longitude, radius],
            }

            const { rows } = await pool.query(query)

            return rows;
            
        } catch (err) {
            console.log(err);
        }
}

module.exports = {getStationsService}