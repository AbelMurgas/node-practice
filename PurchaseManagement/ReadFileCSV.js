const csv = require('csv-parser');
const fs = require('fs');

class ReadFileCSV {
    
    constructor (filename /*, *args*/) {
        this.container = [];
        this.filesName = this.get_other_files_args(constructor, arguments).concat([filename]);

        const promise = new Promise((resolve, reject) => {
            resolve();
            console.log(this.container)
            console.log("guat")
        });
        promise.then(this.obtain_table_object())
        
    }

    get_other_files_args(func, args) {
        return Array.prototype.slice.call (args, func.length);
    }

    obtain_table_object(){
        const result = [];
        fs.createReadStream('product.csv')
        .pipe(csv())
        .on('data', (data) => {
            result.push(data)
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            this.container.push(result)
        });
        console.log(this.container)
    }

}

exports.ReadFileCSV = ReadFileCSV;