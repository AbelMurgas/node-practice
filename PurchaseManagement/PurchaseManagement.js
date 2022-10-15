const csv = require('csv-parser');
const fs = require('fs');
<<<<<<< HEAD
const rf = require('./ReadFileCSV')

const read = new rf.ReadFileCSV("hola","hi", "nomames", "ok");
console.log(read.obtain_table_object())


=======

fs.createReadStream('product.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
>>>>>>> dee8b96f2431925f7398598d5e60ec175f568b9d
