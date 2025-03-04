const connectionDB = require("../config/db");

const AsginacionDetail = function (asignacionDetail) {
    (this.InvoiceHeaderId = asignacionDetail.invoiceHeaderId),
        (this.InvoiceNumber = asignacionDetail.invoiceNumber),
        (this.Client = asignacionDetail.client),
        (this.CardCode = asignacionDetail.cardCode),
        (this.Quantity = asignacionDetail.quantity),
        (this.Currency = asignacionDetail.currency),
        (this.status = asignacionDetail.status)        
        (this.DocDate = asignacion.DocDate),
        (this.DocDueDate = asignacion.DocDueDate),
        (this.LicTradNum = asignacion.LicTradNum);
};

AsginacionDetail.create = (newInvoiceDetail, result) => {
    var sql = `INSERT INTO ${process.env.DB}.InvoiceDetail (InvoiceHeaderId, InvoiceNumber, CardCode, Client, Quantity, Currency, Status, DocDate, DocDueDate, LicTradNum) VALUES ?`;
    var values = newInvoiceDetail;
  
    connectionDB.query(sql, [values], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      result(null, res);
    });
};


AsginacionDetail.createCambio = (cambio, result) => {

  connectionDB.query(
    `UPDATE ${process.env.DB}.TipoCambio SET Qty = ${cambio} WHERE idTipoCambio = 1`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res) {
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
}

AsginacionDetail.findCambio = result => {

  console.log('model');
  connectionDB.query(
    `SELECT * FROM ${process.env.DB}.TipoCambio`,
    (err, res) => {
      if (err) {
        
        result(err, null);
        return;
      }
      
        result(null, res);
        return;
      

    }
  );
};

AsginacionDetail.findBydId = (InvoiceHeaderId, result) => {
    connectionDB.query(
      `SELECT * FROM ${process.env.DB}.InvoiceDetail as d INNER JOIN ${process.env.DB}.Statuses as s
      ON d.Status = s.ID WHERE d.InvoiceHeaderId=${InvoiceHeaderId}`,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
  
        if (res.length) {
          result(null, res);
          return;
        }
  
        result({ kind: "not_found" }, null);
      }
    );
  };

  AsginacionDetail.findByidPrint = (InvoiceHeaderId, result) => {
    connectionDB.query(
      `SELECT CardCode, Client, InvoiceNumber, TipoPago, FechaDePago, QtyCobrado, CantidadDolares, Referencia FROM ${process.env.DB}.InvoiceDetail as d INNER JOIN ${process.env.DB}.Statuses as s
      ON d.Status = s.ID WHERE d.InvoiceHeaderId=${InvoiceHeaderId}`,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
  
        if (res.length) {
          result(null, res);
          return;
        }
  
        result({ kind: "not_found" }, null);
      }
    );
  };

  AsginacionDetail.findBydIdApp = (InvoiceHeaderId, result) => {
    connectionDB.query(
      `SELECT * FROM ${process.env.DB}.InvoiceDetail as d INNER JOIN ${process.env.DB}.Statuses as s
      ON d.Status = s.ID WHERE d.InvoiceHeaderId=${InvoiceHeaderId} AND d.Status = 8`,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
  
        if (res) {
          result(null, res);
          return;
        }
  
        result({ kind: "not_found" }, null);
      }
    );
  };

  AsginacionDetail.updateInvoiceDetail = (body, result) => {
    var queries = '';

    body.forEach(x => {
      queries += `UPDATE ${process.env.DB}.InvoiceDetail SET Status = 9, Referencia = '${x.Referencia}', EstadoCliente = '${x.EstadoCliente}', QtyCobrado = '${x.QtyCobrado}', TipoPago = '${x.TipoPago}', FechaDePago = '${x.FechaDePago}', TipoMoneda = '${x.TipoMoneda}', CantidadDolares = '${x.CantidadDolares}', Coordenadas = '${x.Coordenadas}', Firma = '${x.Firma}' WHERE id = ${x.id}; `;
    });

    console.log(queries);

    connectionDB.query(queries, (err, res) => {
      if(err) {
        result(null, err);
        return;
      }
      result(null, res);
    });
  };

  module.exports = AsginacionDetail;