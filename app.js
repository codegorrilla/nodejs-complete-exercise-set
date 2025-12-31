//nodejs modules
const path = require("path");

//express JS modules
const express = require("express");

//creating an instance of expressJS
const app = express();

//assigning templating engine
app.set("view engine", "pug");
app.set("views", "views");

//parsing req.body middleware
app.use(express.urlencoded({ extended: false }));

//static assets routing middleware
app.use(express.static(path.join(__dirname, "public")));

//test middleware
app.get("/", (req, res, next) => {
	console.log("Setup done");
	res.send("<h1>Hello User!</h1>");
});

//server setup
app.listen(3002);
