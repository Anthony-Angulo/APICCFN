const connectionDB = require("../config/db");
const lookup = require('binlookup')();

const Invoice = function (invoice) {
  (this.DocEntry = invoice.DocEntry),
    (this.UserName = invoice.UserName),
    (this.DocNum = invoice.DocNum),
    (this.Series = invoice.Series),
    (this.DocDate = invoice.DocDate),
    (this.IdUser = invoice.IdUser),
    (this.DocCur = invoice.DocCur),
    (this.DocRate = invoice.DocRate),
    (this.DocTotalIFC = invoice.DocTotalIFC),
    (this.CodBar = invoice.CodBar);
};

Invoice.create = (newInvoice, result) => {
    connectionDB.query(
        `INSERT INTO ${process.env.DB}.FacBurn SET ?`, newInvoice,
        (err, res) => {

            if(err) {
                result(err,null);
                return;
            }

            result(null, {id: res.insertId, ...newInvoice});
        }
    );
};

Invoice.findByCodeBar = (CodeBar, result) => {
    connectionDB.query(
        `SELECT DocNum, UserName, DateBurn FROM ${process.env.DB}.FacBurn WHERE CodBar= ${connectionDB.escape(CodeBar)}`, 
        (err, res) => {

            if(err) {
                result(err, null);
                return;
            }

            result(null, res);
            return;
        }
    ); 
};

Invoice.finByDocNum = (DocNum, result) => {
    connectionDB.query(
        `SELECT DocNum, UserName, DateBurn FROM ${process.env.DB}.FacBurn WHERE DocNum=${connectionDB.escape(DocNum)}`, (err, res) => {
            if(err) {
                result(err, null);
                return;
            }

            result(null, res);
            return;
        }
    );
};

Invoice.findCard = (cardNumber, result) => {
    lookup(cardNumber, function (err, data) {
        console.log(3)
        if(err) {
            result( err, null);
            return;
        }

        console.log(data)

        result(null, data);
        return;
    });
}

module.exports = Invoice;