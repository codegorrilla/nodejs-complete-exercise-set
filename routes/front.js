const path = require("path");
const express = require("express");
const router = express.Router();
const rootDir = require("../util/path");

const prodData = require("./add-products");

router.get("/", (req, res, next) => {
	const products = prodData.products;
	console.log(products);
	//res.sendFile(path.join(rootDir, "views", "front.html"));
	res.render("front", {
		pageTitle: "Shop",
		path: "/shop",
		products: products,
	});
});

module.exports.routes = router;
