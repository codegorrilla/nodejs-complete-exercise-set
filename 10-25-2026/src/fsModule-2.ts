import fs from "node:fs";
import fsPromise from "node:fs/promises";
import process from "node:process";
import path from "node:path";

const newDir = path.join(process.cwd(), "src", "newDir");
console.log(newDir);

const newFile = path.join(newDir, "newFile.txt");
console.log(newFile);

type fileSystem = {
	type: String;
	fileName: String;
	content: String;
	sizeInKB: String;
};

function createNewDir(): void {
	if (!fs.existsSync(newDir)) {
		fs.mkdirSync(newDir, { recursive: true });
	}

	console.log(fs.existsSync(newDir) ? "Folder exists" : "Folder created...");
}

createNewDir();

function createNewFile(): fileSystem {
	if (!fs.existsSync(newFile)) {
		fs.writeFileSync(newFile, "Some sample text", "utf-8");
		console.log("New file created");
	} else {
		fs.appendFileSync(newFile, " added some more sample text", "utf-8");
		console.log("Added text to the existing file");
	}

	const fileName = path.basename(newFile);
	const content = fs.readFileSync(newFile, "utf-8");
	const fileInfo = fs.statSync(newFile);

	return {
		type: "Sync",
		fileName,
		content,
		sizeInKB: `${(fileInfo.size / 1024).toFixed(2)} KB`,
	};
}

const newPromiseFile = path.join(newDir, "newPromiseFile.txt");

console.log(newPromiseFile);

async function createNewPromiseFile(): Promise<fileSystem> {
	await fsPromise.writeFile(newPromiseFile, "Written with promises", "utf-8");

	const content = await fsPromise.readFile(newPromiseFile, "utf-8");

	const promiseFleInfo = await fsPromise.stat(newPromiseFile);

	return {
		type: "Promises",
		fileName: path.basename(newPromiseFile),
		content,
		sizeInKB: `${(promiseFleInfo.size / 1024).toFixed(2)} KB`,
	};
}

async function main(): Promise<void> {
	try {
		createNewFile();
		console.log(createNewFile());

		await createNewPromiseFile();
		console.log(await createNewPromiseFile());
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : "Unknown error";
		console.log(errorMsg);
	}
}

main();
