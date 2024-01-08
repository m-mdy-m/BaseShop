const logout = (event) => {
  const csrf = event.parentNode.querySelector("[name=_csrf]").value;
  console.log("csrf =>", csrf);
  fetch("/logout", {
    method: "DELETE",
    headers: {
      "csrf-token": csrf,
    },
    redirect : "/signup",
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log("data =>", data);
    });
  //   const result = await fetch("/logout", {
  //     method: "DELETE",
  //     headers: {
  //       "csrf-token": csrf,
  //     },
  //   });
  //   await result.json()
};
