const render = require("../util/render");
exports.getSignUp = (req, res, nxt) => {
  const msgErr = req.flash("ERROR");
  render(req, res, "auth/signup", "SIGNUP", msgErr, []);
};
exports.postSignUp =async (req,res,nxt)=>{
  
}