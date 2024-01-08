const render = (req, res, view, title, msgErr = null, validateErrors = [], ...newObj) => {
  let messageError = req.flash("error");
  if (msgErr.length > 0) {
    messageError = msgErr[0];
  } else {
    messageError = null;
  }
  res.render(view, {
    title: title,
    path: req.path,
    msgErr: messageError,
    validateErrors: validateErrors,
    ...newObj
  });
};
module.exports = render;
