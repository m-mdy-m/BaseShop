const deleteProduct = async (btn) => {
  console.log("click");
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const prodId = btn.parentNode.querySelector("[name=prodId]").value;
  const card = document.querySelector(".card");
  console.log('btn =>',btn)
//   console.log('card.remove(card.childNodes) =>',card.remove(card.childNodes))
  const url = `/delete-product/${prodId}`;
//   fetch(url, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       "CSRF-Token": csrf,
//     },

//   })
//     .then((result) => {
//       if (result.ok) {
//         return result.json();
//       }
//     })
//     .then((data) => {
//       console.log(data);
//       card.removeChild(card.childNodes)
//     })
//     .catch((err) => {
//       console.log("err =>",err);
//     });
};
