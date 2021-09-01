const connectionDB = require("../config/db");

// Constructor
const Inventory = function(inventory) {
    this.TypeID = inventory.TypeID,
    this.StatusID = inventory.StatusID,
    this.WarehouseID = inventory.WarehouseID,
    this.UserID = inventory.UserID
}

Inventory.create = (newInventory, result) => {
    connectionDB.query(`INSERT INTO ${process.env.DB}.Inventories SET ?`, newInventory, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newInventory});
    });
};

Inventory.getAll = result => {
    connectionDB.query(`SELECT i.ID, t.Label, s.Label as Status, s.id as statusId, w.WhsName, u.UserName, i.DateCreated FROM ${process.env.DB}.Inventories AS i 
    JOIN  ${process.env.DB}.InventoryTypes AS t 
        ON i.TypeID = t.id 
    JOIN  ${process.env.DB}.Statuses AS s 
        ON i.StatusID = s.id 
    JOIN  ${process.env.DB}.Warehouses AS w 
        ON i.WarehouseID = w.id 
    JOIN ${process.env.DB}.Users AS u
        ON i.UserId = u.id`, (err, res) => {

        if(err) {
            console.log("error: " , err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Inventory.getFullActive = result => {
    connectionDB.query(`SELECT i.ID, t.Label, s.Label as Status, s.id as statusId, w.WhsName, u.Name, u.LastName, i.DateCreated FROM ${process.env.DB}.Inventories AS i 
    JOIN  ${process.env.DB}.InventoryTypes AS t 
        ON i.TypeID = t.id 
    JOIN  ${process.env.DB}.Statuses AS s 
        ON i.StatusID = s.id 
    JOIN  ${process.env.DB}.Warehouses AS w 
        ON i.WarehouseID = w.id 
    JOIN ${process.env.DB}.Users AS u
        ON i.UserId = u.id
    WHERE s.id = 2 AND t.id = 2`, (err, res) => {

        if(err) {
            console.log("error: " , err);
            result(null, err);
            return;
        }

        result(null, res);
    });
}

Inventory.getPartialActive = result => {
    connectionDB.query(`SELECT i.ID, t.Label, s.Label as Status, s.id as statusId, w.WhsName, u.Name, u.LastName, i.DateCreated FROM ${process.env.DB}.Inventories AS i 
    JOIN  ${process.env.DB}.InventoryTypes AS t 
        ON i.TypeID = t.id 
    JOIN  ${process.env.DB}.Statuses AS s 
        ON i.StatusID = s.id 
    JOIN  ${process.env.DB}.Warehouses AS w 
        ON i.WarehouseID = w.id 
    JOIN ${process.env.DB}.Users AS u
        ON i.UserId = u.id
    WHERE s.id = 2 AND t.id = 1`, (err, res) => {

        if(err) {
            console.log("error: " , err);
            result(null, err);
            return;
        }

        result(null, res);
    });
}

Inventory.findProductsByUser = (inventoryId, userId, result) => {
    connectionDB.query(`SELECT * FROM ${process.env.DB}.InventoryProducts AS i WHERE i.InventoryID=${inventoryId} AND i.UserId=${userId}`, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        if(res.length) {
            result(null, res);
            return;
        }

        result({ kind: "not_found"}, null);
    });
}

Inventory.findById = (inventoryId, result) => {
    connectionDB.query(`SELECT i.ID, t.Label, s.Label as Status, s.id as StatusId, w.WhsName, w.WhsCode, u.Name, i.DateCreated FROM ${process.env.DB}.Inventories AS i 
    JOIN  ${process.env.DB}.InventoryTypes AS t 
        ON i.TypeID = t.id 
    JOIN  ${process.env.DB}.Statuses AS s 
        ON i.StatusID = s.id 
    JOIN  ${process.env.DB}.Warehouses AS w 
        ON i.WarehouseID = w.id 
    JOIN ${process.env.DB}.Users AS u
        ON i.UserId = u.id
    WHERE i.ID=${inventoryId}`, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }

        if(res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found"}, null);
    });
};

Inventory.updateStatusById = (inventoryId, statusId, result) => {
    connectionDB.query(
        `UPDATE ${process.env.DB}.Inventories SET StatusID=${statusId} WHERE ID=${inventoryId}`, (err, res) => {
            if(err) {
                console.log("error: " , err);
                result(null, err);
                return;
            }
    
            result(null, res);
        }
    );
};


module.exports = Inventory;