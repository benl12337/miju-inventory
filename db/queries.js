const pool = require("./pool");

async function getAllItems() {
    const { rows } = await pool.query("SELECT * FROM stationery ORDER BY name ASC");
    return rows;
};

async function getItem(id) {
    const { rows } = await pool.query("SELECT * FROM stationery WHERE product_id=$1", [id]);
    return rows[0];
};

async function updateItem(id, fields) {
    await pool.query("UPDATE stationery SET name=$1, supplier=$2, stock=$3, comment=$4, category=$5 WHERE product_id=$6", [fields.product, fields.supplier, fields.stock, fields.comment, fields.category, id]);
};

async function addItem(fields) {
    await pool.query("INSERT INTO stationery (name, supplier, stock, comment, category) VALUES ($1, $2, $3, $4, $5)", [fields.product, fields.supplier, fields.stock, fields.comment, fields.category]);
};

async function deleteItem(id) {
    await pool.query("DELETE FROM stationery WHERE product_id=$1", [id]);
}

async function addSupplier(fields) {
    await pool.query("INSERT INTO suppliers (supplier, prefecture) VALUES ($1, $2)", [fields.supplier, fields.prefecture]);
}

async function addCategory(value) {
    await pool.query("INSERT INTO categories (category) VALUES ($1)", [value]);
}


async function getAllCategories() {
    const { rows } = await pool.query("SELECT categories.category, categories.category_id, COUNT(DISTINCT stationery.name) as count FROM categories FULL OUTER JOIN stationery ON stationery.category = categories.category GROUP BY categories.category_id ORDER BY categories.category ASC");
    return rows;
};

async function getCategoryItems(categoryId) {
    const { rows } = await pool.query("SELECT * FROM stationery LEFT JOIN categories ON stationery.category = categories.category WHERE categories.category_id = $1", [categoryId]);
    return rows;
};

async function getAllSuppliers() {
    const { rows } = await pool.query("SELECT suppliers.supplier, suppliers.prefecture, suppliers.supplier_id, COUNT(DISTINCT stationery.name) as count FROM suppliers FULL OUTER JOIN stationery ON stationery.supplier = suppliers.supplier GROUP BY suppliers.supplier_id ORDER BY suppliers.supplier ASC");
    return rows;
};

async function getSupplierItems(supplierId) {
    const { rows } = await pool.query("SELECT * FROM stationery LEFT JOIN suppliers ON stationery.supplier = suppliers.supplier WHERE suppliers.supplier_id = $1", [supplierId]);
    console.log(rows);
    return rows;
};

module.exports = {
    getAllItems,
    getItem,
    updateItem,
    addItem,
    deleteItem,
    addSupplier,
    addCategory,
    getAllCategories,
    getCategoryItems,
    getAllSuppliers,
    getSupplierItems
}


