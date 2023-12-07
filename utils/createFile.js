import fs from "fs/promises";
export async function createFile(path) {
  try {
    const existingFileHandling = await fs.open(path, "r");
    console.log(`The file ${path} is already exists`);
    existingFileHandling.close();
  } catch (error) {
    const newExistingFile = await fs.open(path, "w");
    newExistingFile.close();
    console.log(`The file ${path} was Successfully Created`);
  }
}
