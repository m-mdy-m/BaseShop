const deleteProduct = async (btn) => {
  console.log("click");
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
  console.log('cardItem =>',cardItem)
  cardItem.parentNode.removeChild(cardItem)
  console.log('cardItem =>',cardItem.parentNode)
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
