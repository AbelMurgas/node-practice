const csv = require("csv-parser");
const fs = require("fs");

async function getDataFiles() {
  const purchaseCSV = await getFileData("purchase.csv");
  const productCSV = await getFileData("product.csv");
  console.log("---- returning files ----");
  return { product: productCSV, purchase: purchaseCSV };
}

async function getFileData(file) {
  return new Promise((res, rej) => {
    const listObject = [];
    const readable = fs.createReadStream(file)
    readable.on('error', (err) => {
     console.log(err["errno"] === -4058 ? `ERROR: The file ${file} not found` : err)
     res(null)
    });
    readable.pipe(csv())
      .on("data", (row) => {
       listObject .push(row);
      })
      .on("end", () => {
        console.log(`---- ${file} successfully processed ----`);
        res(listObject);
      })
  });
}

module.exports = getDataFiles;
