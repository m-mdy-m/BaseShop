const deleteProduct = async (btn) => {
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const prodId = btn.parentNode.querySelector("[name=prodId]").value;
  const cards = document.querySelectorAll(".card");
  let cardItem;
  cards.forEach((card) => {
    const id = card.querySelector("[name=prodId]").value;
    if (id === prodId) {
      cardItem = card;
    }
  });
  cardItem.parentNode.removeChild(cardItem);
  const url = `/delete-product/${prodId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrf,
    },
  });
  response.json();
  cardItem.parentNode.removeChild(cardItem);
};
