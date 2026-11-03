import "dotenv/config";
import process from "node:process";
import http, { IncomingMessage, ServerResponse } from "node:http";

const port: string | number = process.env.PORT || 4001;
const server = http.createServer(
	(req: IncomingMessage, res: ServerResponse) => {
		const method = req.method;
		const url = req.url;
		const userAgent = req.headers["user-agent"];
		console.log(userAgent);

		res.statusCode = 200;
		res.setHeader("Content-type", "text/plain");
		res.end(`Basic http node server: ${method}: ${url}: ${userAgent}`);
	},
);

server.listen(port, () => {
	console.log(`Server running on port:  ${port}`);
	console.log(`API is running here: http://localhost:${port}`);
});
