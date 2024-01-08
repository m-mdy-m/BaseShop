module.exports = (req, res, nxt) => {
  res.locals.isAuth = req.session.isLogin;
  res.locals.csrfToken = req.csrfToken();
  nxt();
};
