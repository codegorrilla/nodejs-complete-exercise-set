const path = require("path");
const express = require("express");
//const bodyParser = require("body-parser");

const app = express();

//helper function for absolute directory path
const rootDir = path.dirname(require.main.filename);

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/users", (req, res, next) => {
	console.log("User listing page");
	res.sendFile(path.join(rootDir, "views", "userlist.html"));
});

//main route middleware
app.get("/", (req, res, next) => {
	console.log("Home page");
	res.sendFile(path.join(rootDir, "views", "users.html"));
});

//404 middleware
app.use((req, res, next) => {
	console.log("404 page");
	res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3001);
