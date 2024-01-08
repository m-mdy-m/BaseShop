function logout(e) {
  e.preventDefault();
  const csrf = e.target.parentNode.querySelector("[name=_csrf]").value;
  fetch("/logout", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "CSRF-Token": csrf,
    },
    body: JSON.stringify({ csrf: csrf }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/"; // Redirect to the home page after successful logout
      } else {
        throw new Error("Failed to log out");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
