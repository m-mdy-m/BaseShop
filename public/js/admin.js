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
const editProduct = async (btn) => {
    console.log(btn);
    const form = btn.closest("form");
    const csrf = form.querySelector("[name=_csrf]").value;
    const formData = new FormData(form);
    try {
      const response = await fetch("/edit-product", {
        method: "PUT",
        headers: {
          "CSRF-Token": csrf,
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
  
      // If the edit was successful
      if (response.ok) {
        window.location.href = '/'; // This will redirect to the main page
      } else {
        // Handle the error, show a message to the user or something else
        console.error('Edit failed:', data);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };