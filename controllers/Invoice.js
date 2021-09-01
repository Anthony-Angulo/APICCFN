const asyncHandler = require("../middleware/async");
const Invoice = require("../models/Invoices");

exports.createInvoice = asyncHandler(async(req, res, next) => {
    const invoice = new Invoice({
         DocEntry: req.body.DocEntry,
         UserName: req.body.UserName,
         DocNum: req.body.DocNum,
         Series: req.body.Series,
         DocDate: req.body.DocDate,
         IdUser: req.body.IdUser,
         DocCur: req.body.DocCur,
         DocRate: req.body.DocRate,
         DocTotalIFC: req.body.DocTotalIFC,
         CodBar: req.body.CodBar
    });

    Invoice.create(invoice, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getInvoice = asyncHandler(async (req, res, next) => {
    Invoice.findByCodeBar(req.params.codeBar, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.getInvoiceByDocNum = asyncHandler(async (req, res, next) => {
    Invoice.finByDocNum(req.params.docnum, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

exports.findCard = asyncHandler(async (req, res, next) => {
    Invoice.findCard(req.params.cardnum, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            res.status(200).send(data);
        }
    });
});

