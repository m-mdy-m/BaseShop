const render = (req, res, view, title, msgErr, validateErrors=[]) => {
  res.render(view, {
    title: title,
    path: req.path,
    msgErr: msgErr,
    validateErrors: validateErrors,
  });
};
module.exports = render;
