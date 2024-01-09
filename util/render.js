const render = (req, res, view, title, msgErr=null, validateErrors = [], {...newObj}={}) => {
  if (msgErr && msgErr.length > 0) {
    msgErr = msgErr[0].msg
  } else {
    msgErr = null;
  }
  newObj.oldValue ={
    name : '',
    email : '',
    password : '',
  }
  if(newObj.oldValue.confirmPassword){
    newObj.oldValue.confirmPassword = ''
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
