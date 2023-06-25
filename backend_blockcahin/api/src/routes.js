const { Router } = require("express");
const userControler = require("./controllers/userControler");
const productsController = require("./controllers/productsController");

const router = Router();

router.post("/user", userControler.create);
router.post("/product/user/:id", productsController.create);

module.exports = { router };
