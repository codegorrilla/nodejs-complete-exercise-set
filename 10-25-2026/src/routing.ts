import http, { IncomingMessage, ServerResponse } from "node:http";
import process from "node:process";
import "dotenv/config";

const port = process.env.PORT || 5001;
const server = http.createServer(
	(req: IncomingMessage, res: ServerResponse) => {
		const method = req.method ?? "GET";

		console.log(`Server is running at host: ${req.headers.host}`);

		const requestUrl = new URL(
			req.url ?? "/",
			`http://${req.headers.host ?? "localhost"}`,
		);

		const pathName = requestUrl.pathname;
		console.log(pathName);

		res.setHeader("Content-type", "text/plain");

		if (method === "GET" && pathName === "/health") {
			res.statusCode = 200;
			res.end("Server is healthy");
			return;
		}

		if (method === "GET" && pathName === "/users") {
			res.statusCode = 200;
			res.end("List of users");
			return;
		}

		if (method === "POST" && pathName === "/add") {
			res.statusCode = 200;
			res.end("User added successfully");
			return;
		}
	},
);

server.listen(port, () => {
	console.log(`Server is now running on http://localhost:${port}`);
});
