const getDataTables = require("./DataFiles");
const PurchaseManagement = require("./PurchaseManagement");

async function main() {
  const data = await getDataTables();
  const pm = new PurchaseManagement(data);
  console.log(pm.getOrderListProductsTotalSalesDesc());
  console.log(pm.getListUnSoldProduct())
  console.log(pm.getListSoldProduct());
}

main();
