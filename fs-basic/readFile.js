/**
 * @Open The File
 * (32) File Descriptor
 * @Read Or Write What ever you want.
 */
const fs = require("fs/promises");

(async () => {
  //  Lets open the file
  const aboutFileHandler = await fs.open("./about.txt", "r");
  // Watch the file
  const watcher = await fs.watch("./about.txt");

  for await (const event of watcher) {
    // Get the size of our file
    const size = (await aboutFileHandler.stat()).size;
    // Allocate our buffer with the file of the size
    const buff = Buffer.alloc(size);
    // The location at which wen want to start filling our buffer
    const offset = 0;
    // How many bytes we want to read
    const length = buff.byteLength;
    // The postion that we want read the file from
    const position = 0;

    //   We always want te read the whol file
    const content = await aboutFileHandler.read(buff, offset, length, position);
    console.log(content);
  }
})();
