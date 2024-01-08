const render = (req, res, view, title, msgErr = null, validateErrors = [], {...newObj}) => {
  if (msgErr.length > 0) {
  return msgErr
  } else {
    msgErr = null;
  }
  var ErrorPath;
  validateErrors.forEach(e =>{
    ErrorPath = e.path
  })
  res.render(view, {
    title: title,
    path: req.path,
    msgErr: msgErr,
    validateErrors: ErrorPath,
    ...newObj
  });
};
module.exports = render;
