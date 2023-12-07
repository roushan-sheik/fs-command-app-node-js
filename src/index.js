import fs from "fs/promises";

(async () => {
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
    await commandFileHandler.read(buffer, offset, length, position);
    console.log(buffer);
  });

  const watcher = await fs.watch("../");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
