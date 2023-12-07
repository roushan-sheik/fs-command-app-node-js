/// Another way ===========================================> mone clena
const fs = require("fs/promises");

(async () => {
  //  Lets open the file
  const aboutFileHandler = await fs.open("./about.txt", "r");

  aboutFileHandler.on("change", async () => {
    // Get the size of our file
    const size = (await aboutFileHandler.stat()).size;

    // **NOTE - We Need(BOLP)= buffer offset length position
    // Allocate our buffer with the file of the size
    const buff = Buffer.alloc(size);
    // The location at which we want to start filling our buffer
    const offset = 0;
    // How many bytes we want to read
    const length = buff.byteLength;
    // The postion that we want read the file from
    const position = 0;

    //   We always want te read the whol file
    await aboutFileHandler.read(buff, offset, length, position);
    // Decoder 01 => meaningful
    // Encoder meaningful => 01

    console.log(buff.toString("utf-8"));
  });

  // Watch the file......
  const watcher = await fs.watch("./about.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      aboutFileHandler.emit("change");
    }
  }
})();
