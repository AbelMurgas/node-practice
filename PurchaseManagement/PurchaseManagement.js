<<<<<<< HEAD
const csv = require('csv-parser');
const fs = require('fs');
const rf = require('./ReadFileCSV')

const read = new rf.ReadFileCSV("hola","hi", "nomames", "ok");
console.log(read.obtain_table_object())



fs.createReadStream('product.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
=======
class PurchaseManagement {
  #product;
  #purchase;
  #listProductsTotalSales;

  constructor(tables) {
    this.#product = tables.product;
    this.#purchase = tables.purchase;
    this.#listProductsTotalSales = this.#getListProductsTotalSales(tables);
  }

  #getListProductsTotalSales = ({ purchase, product }) => {
    return product.map((element) => {
      return {
        id: element.id,
        description: element.description,
        totalSale: purchase.reduce((accumulator, object) => {
          return object.product === element.id
            ? accumulator + object.quantity * element.price
            : accumulator;
        }, 0),
      };
    });
  };

  getOrderListProductsTotalSalesDesc() {
    return this.#orderProductsByTotalSalesDesc(this.#listProductsTotalSales);
  }

  #orderProductsByTotalSalesDesc = (listProductsTotalSales) => {
    return listProductsTotalSales.sort((producto1, producto2) => {
      return producto1.totalSale === producto2.totalSale
        ? 0
        : producto1.totalSale > producto2.totalSale
        ? -1
        : 1;
    });
  };

  getListSoldProduct = () => {
    return this.#product.filter((obj) => {
      return this.#listProductsTotalSales.some((element) => {
        return obj.id === element.id && element.totalSale > 0;
      });
    });
  };

  getListUnSoldProduct = () => {
    return this.#product.filter((obj) => {
      return this.#listProductsTotalSales.some((element) => {
        return obj.id === element.id && element.totalSale === 0;
      });
    });
  };
}

module.exports = PurchaseManagement;
>>>>>>> 95a9826dd9830db991ef8abba5a95dbeca662b48
