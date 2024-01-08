const render = (req, res, view, title, msgErr = null, validateErrors = [], ...newObj) => {
  let messageError = req.flash("error");
  if (messageError.length > 0) {
    messageError = messageError[0];
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
