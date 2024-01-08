const render = require("../util/render");
const User = require("../models/User")
const { validationResult } = require('express-validator')
exports.getSignUp = (req, res, nxt) => {
  const msgErr = req.flash("ERROR");
  render(req, res, "auth/signup", "SIGNUP", msgErr, []);
};
exports.postSignUp =async (req,res,nxt)=>{
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const err = validationResult(req)
  if(!err.isEmpty()){
    let errors = err.array()
    console.log('errors=>',errors)
    return render(req,res,'auth/signUp',"SIGNUP", err.array()[0].msg, errors,)
  }
  
}