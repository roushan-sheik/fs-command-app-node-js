/**
 * @Promises API
 *
 */

const fs = require("fs/promises");

(async () => {
  try {
    await fs.copyFile("../arifa.txt", "../promisess.html");
  } catch (error) {
    console.log(error);
  }
})();
