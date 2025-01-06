const { Router } = require('express');
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.showItems);
indexRouter.get("/item/:id", indexController.showItem);
indexRouter.get("/categories", indexController.showCategories);
indexRouter.get("/categories/:id", indexController.showCategoryItems);
indexRouter.get("/suppliers", indexController.showSuppliers);
indexRouter.get("/suppliers/:id", indexController.showSupplierItems);
indexRouter.post("/item/:id", indexController.updateItem);
indexRouter.get("/add/:value", indexController.addValue);
indexRouter.post("/add/:value", indexController.addNewValue);
indexRouter.post("/delete/item/:id", indexController.deleteItem);
module.exports = indexRouter;