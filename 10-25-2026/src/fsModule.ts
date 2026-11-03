import process from "node:process";
import path from "node:path";
import fs, { existsSync, mkdirSync } from "node:fs";
import fsPromises from "node:fs/promises";

console.log(process.cwd());

const fsModulePath = path.join(process.cwd(), "fsModule.ts");
console.log("Current file path is: ", fsModulePath);

const testFolderPath = path.join(process.cwd(), "src", "test");
console.log(testFolderPath);

const testFile = path.join(testFolderPath, "testFile.txt");
console.log(testFile);

type fileSystem = {
	fileName: string;
	style: string;
	content: string;
	sizeInBytes: number;
};

function createFolder(): void {
	if (!existsSync(testFolderPath)) {
		mkdirSync(testFolderPath, { recursive: true });
	}

	console.log(
		fs.existsSync(testFolderPath) ? "Folder exists" : "Folder created",
	);
}

function createFile(): fileSystem {
	if (!fs.existsSync(testFile)) {
		fs.writeFileSync(testFile, "some test text", "utf-8");
		console.log("File created");
	} else {
		fs.appendFileSync(
			testFile,
			" adding something to the test file again",
			"utf-8",
		);
		console.log("Text content added again");
	}

	const content = fs.readFileSync(testFile, "utf-8");
	const fileInfo = fs.statSync(testFile);
	//console.log(fileInfo);

	return {
		fileName: path.basename(testFile),
		style: "Sync",
		content,
		sizeInBytes: fileInfo.size,
	};
}

async function main(): Promise<void> {
	try {
		createFolder();
		createFile();
	} catch (error) {}
}

main();
