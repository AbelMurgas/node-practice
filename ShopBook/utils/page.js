exports.getPageList = (amountPage, currentPage) => {
  let listPage;
  if (currentPage < 3) {
    listPage = [...Array(amountPage < 3 ? amountPage : 3).keys()].map(
      (i) => i + 1
    );
  } else if (currentPage >= 3 && currentPage < 5) {
    listPage = [
      ...Array(
        currentPage === amountPage ? amountPage : currentPage + 1
      ).keys(),
    ].map((i) => i + 1);
  } else {
    listPage = [currentPage - 1, currentPage];
    if (currentPage < amountPage) {
      listPage.push(currentPage + 1);
    }
  }
  return listPage;
}
