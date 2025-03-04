const connectionDB = require("../config/db");

const ProductLocations = function (productLocation) {
    (this.idtarima = productLocation.tarimaid),
    (this.producto = productLocation.producto),
    (this.cantidad = productLocation.cantidad),
    (this.unidaddeMedida = productLocation.unidaddeMedida),
    (this.fechacaducidad = productLocation.fechacaducidad)

}

ProductLocations.findById = (tarimaId, result) => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.tarimaproducto WHERE idtarima=${tarimaId} AND producto != ' '`,
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
};

ProductLocations.addProduct = (newProduct, result) => {
    connectionDB.query(
        `INSERT INTO ${process.env.DB}.tarimaproducto SET ?`, newProduct,
        (err, res) => {
            if(err) {
                result(err, null);
                return;
            }
            result(null, {id: res.insertId, ...newProduct})
        }
    )
}

ProductLocations.removeProduct = (idTarima, producto, result) => {
    connectionDB.query(
        `UPDATE ${process.env.DB}.tarimaproducto SET producto=null, cantidad=null, fechacaducidad=null, unidaddeMedida=null WHERE idtarima=${idTarima} AND producto='${producto}'`,
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

ProductLocations.updateProduct = (id, qty, um, fecha, result) => {
    connectionDB.query(
        `UPDATE ${process.env.DB}.tarimaproducto SET cantidad=${qty}, unidaddeMedida='${um}', fechacaducidad='${fecha}' WHERE id=${id}`,
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

module.exports = ProductLocations;