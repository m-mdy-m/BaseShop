const logout = async (event) => {
  const csrf = event.parentNode.querySelector("[name =_csrf]").value;
  console.log(csrf);
  const url = "/logout";
  const result = await fetch(url, {});
  console.log(result);
  //   const result = await fetch("/logout", {
  //     method: "DELETE",
  //     headers: {
  //       "csrf-token": csrf,
  //     },
  //   });
  //   await result.json()
};
