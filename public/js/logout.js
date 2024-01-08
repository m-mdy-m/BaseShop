const logout = async (event) => {
  const csrf = event.parentNode.querySelector("[name =_csrf]").value;
  console.log(csrf)
  const result = await fetch("/logout", {
    method: "DELETE",
    headers: {
      "csrf-token": csrf,
    },
  });
  return await result.json()
};
