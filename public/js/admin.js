const deleteProduct = async (btn) => {
  console.log("click");
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const prodId = btn.parentNode.querySelector("[name=prodId]").value;
  const card = document.querySelector('.card')
  const url = "/delete-product";
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrf,
    },
  }).then((result) => {
    if(result.ok){
        return result.json()
    }
  }).then(data =>{
    console.log(data)
  card.removeChild(card.children)
})
  .catch((err) => {
    console.log(err)
  });
};
