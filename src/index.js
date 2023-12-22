import fs from "fs/promises";
import { createFile } from "../utils/index.js";

(async () => {
  // ================== Commands =================
  const CREATE_FILE = "create file";
  const DELETE_FILE = "delete file";
  const RENAME_FILE = "rename file";
  const ADD_TO_FILE = "add to file";
  // Open the file
  const commandFileHandler = await fs.open("../command.txt", "r");
  commandFileHandler.on("change", async () => {
    // get the size of  our file
    const size = (await commandFileHandler.stat()).size;
    // allocate the buffer with the file of the size
    const buffer = Buffer.alloc(size);
    // the location at which we want to read the file from.
    const offset = 0;
    // how many buffers wen want to read
    const length = buffer.byteLength;
    // the position that we want read the file from
    const position = 0;
    // Finally read the file
    await commandFileHandler.read(buffer, offset, length, position);
    const command = buffer.toString("utf-8");
    // console.log(command);

    if (command.includes(CREATE_FILE)) {
      const path = command.substring(CREATE_FILE.length + 1);
      createFile(path);
    }
  });
  // Watch the command file and target the event
  const watcher = await fs.watch("../");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
