//nodejs modules
const path = require("path");

//express JS modules
const express = require("express");

//creating an instance of expressJS
const app = express();

//importing add-products route
const prodData = require("./routes/add-products");
const storeData = require("./routes/front");

//importing helper function
const rootDir = require("./util/path");

//assigning templating engine
app.set("view engine", "pug");
app.set("views", "views");

//parsing req.body middleware
app.use(express.urlencoded({ extended: false }));

//static assets routing middleware
app.use(express.static(path.join(__dirname, "public")));

//using add-products route
app.use("/shop", prodData.routes);

//using store route
app.use("/shop", storeData.routes);

//middleware for 404 page
app.use((req, res, next) => {
	//res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
	res.status(404).render("404", {
		pageTitle: "Page Not Found",
	});
});

//server setup
app.listen(3002);
