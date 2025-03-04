const connectionDB = require("../config/db");


const Locations = function (location) {
    (this.ubicacion = location.ubicacion)
};

Locations.create = (newLocation, result) => {
    connectionDB.query(
        `INSERT INTO ${process.env.DB}.tarima SET ?`, newLocation,
        (err, res) => {
            if(err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertId, ...newLocation})
        }
    );
};

Locations.findbyId = (ubicacion, sufijo, result) => {
    connectionDB.query(
        `SELECT id FROM ${process.env.DB}.tarima WHERE ubicacion='${ubicacion}' AND sufijo='${sufijo}'`,
        (err, res) => {
            if(err){
                result(err, null);
                return;
            }

            if(res){
                result(null, res);
                return;
            }

            result({kind: "not_found"}, null);
        }
    );
}


Locations.updateLocation = (id, ubicacion, sufijo, result) => {
    connectionDB.query(
        `UPDATE ${process.env.DB}.tarima SET ubicacion='${ubicacion}', sufijo='${sufijo}' WHERE id=${id}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
          
              result(null, res);
        }
    )
}



module.exports = Locations;