const deleteProduct = async (btn) => {
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const prodId = btn.parentNode.querySelector("[name=prodId]").value;
  const cards = document.querySelectorAll(".card");
  let cardItem;
  cards.forEach(card =>{
    const id = card.querySelector("[name=prodId]").value
    if(id === prodId){
        cardItem = card
    }
  })
  cardItem.parentNode.removeChild(cardItem)
  const url = `/delete-product/${prodId}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrf,
    },

  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
    })
    .then((data) => {
      console.log(data);
      cardItem.parentNode.removeChild(cardItem)
    })
    .catch((err) => {
      console.log("err =>",err);
    });
};
