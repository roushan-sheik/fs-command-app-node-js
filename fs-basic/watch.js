/**
 * @fs module watch
 *
 */

const fs = require("fs/promises");

(async () => {
  const watcher = await fs.watch("./");
  for await (const event of watcher) {
    if (event.eventType === "change" && event.filename === "about.txt") {
      // About Event
      console.log("Our Privet About File has been changed.");
      //   console.log(event);
    }
    // console.log("Our Public file changing....");
    // console.log(event);
  }
})();
