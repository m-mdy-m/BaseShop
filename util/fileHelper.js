const fs = require("fs");
const deleteFile = (path) => {
  if(path){
    fs.unlink(path, (err) => {
      if (err) {
        throw err;
      }
    });
  }
  return ;
};
module.exports = deleteFile