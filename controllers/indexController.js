const db = require("../db/queries");

// navbar links
const links = [
    {href: "/", text: "All Items"},
    {href: "/categories", text: "Categories"},
    {href: "/suppliers", text: "Suppliers"}
]

async function showItems(req,res) {
    const items = await db.getAllItems();
    res.render("index", {items: items, links: links})
}

async function showItem(req,res) {

    // get specific item
    const itemId = req.params.id;
    const item = await db.getItem(itemId);

    // get list of suppliers & categories
    const suppliers = await db.getAllSuppliers();
    const categories = await db.getAllCategories();

    res.render("item", {item:item, suppliers: suppliers, categories: categories});
}

async function updateItem(req,res) {
    // get the item id
    const itemId = req.params.id;
    const formSubmission = req.body;
    await db.updateItem(itemId, formSubmission);
    // update the item id
    res.redirect("/");
}

async function showCategories(req,res) {
    // get all the categories
    const categories = await db.getAllCategories();
    res.render("categories", {categories: categories, links: links});
}

async function showCategoryItems(req,res) {
    // get all items from category
    const categoryId = req.params.id;
    const items = await db.getCategoryItems(categoryId);
    res.render("filteredItems", {items:items, links: links})
}

async function showSuppliers(req,res) {
    const suppliers = await db.getAllSuppliers();
    res.render("suppliers", {suppliers: suppliers, links: links})
}

async function showSupplierItems(req,res) {
    const supplierId = req.params.id;
    const items = await db.getSupplierItems(supplierId);
    res.render("filteredItems", {items:items, links: links})
}

async function addValue(req,res) {
    
    const object = req.params.value;
    const categories = await db.getAllCategories();
    const suppliers = await db.getAllSuppliers();

    // render a different page depending on requested object
    if (object === 'item') {
        res.render("newItem", {categories: categories, suppliers: suppliers});
    } else if (object === 'supplier') {
        res.render("newSupplier")
    } else if (object === 'category') {
        res.render("newCategory")
    }
}

async function addNewValue(req,res) {
    const object = req.params.value;
    const formSubmission = req.body;

    if (object === 'item') {
        await db.addItem(formSubmission);
    } else if (object === 'supplier') {
        await db.addSupplier(req.body);
    } else if (object === 'category') {
        await db.addCategory(req.body.category);
    }
    res.redirect("/");
}

async function deleteItem(req,res) {
    const productId = req.params.id;
    await db.deleteItem(productId);
    res.redirect("/");
}

module.exports = {
    showItems,
    showItem,
    updateItem,
    showCategories,
    showCategoryItems,
    showSuppliers,
    showSupplierItems,
    addValue,
    addNewValue,
    deleteItem
}