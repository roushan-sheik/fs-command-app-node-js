/**
 * @Callback API
 */
const fs = require("fs");

fs.copyFile("../arifa.txt", "../helloCB.html", (er) => {
  if (er) console.log(er);
});
