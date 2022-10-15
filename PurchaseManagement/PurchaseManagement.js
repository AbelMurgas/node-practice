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
