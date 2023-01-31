const deleteProduct = (btn) => {
  const idProduct = btn.parentNode.querySelector("[name=id").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf").value;
  fetch("/admin/product/" + idProduct, {
    method: "DELETE",
    headers: {
      "csrf-token": csrf,
    },
  })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};
