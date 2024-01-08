function logout(e) {
  const csrf = e.target.parentNode.querySelector("[name=_csrf]").value;
  fetch("/logout", {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json",
       "CSRF-Token": csrf,
     },
  })
     .then((response) => {
       if (response.ok) {
         window.location.href = "/";
       } else {
         throw new Error("Failed to log out");
       }
     })
     .catch((error) => {
       console.error("Error:", error);
     });
 }
 