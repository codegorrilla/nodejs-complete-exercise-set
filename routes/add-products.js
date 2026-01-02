const path = require("path");
const express = require("express");
const router = express.Router();
const rootDir = require("../util/path");

const products = [];

router.get("/add-product", (req, res, next) => {
	//res.sendFile(path.join(__dirname, "../", "views", "add-products.html"));
	//res.sendFile(path.join(rootDir, "views", "add-products.html"));
	res.render("add-products", {
		pageTitle: "Add Product",
		path: "/shop/add-product",
	});
});

router.post("/add-product", (req, res, next) => {
	products.push({ title: req.body.prodTitle });
	console.log(req.body.title);
	console.log(products);
	res.redirect("/shop");
});

module.exports.routes = router;
module.exports.products = products;
