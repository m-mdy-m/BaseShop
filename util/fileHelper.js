const fs = require("fs");
const deleteFile = (path) => {
  if(path.length > 1){
    fs.unlink(path, (err) => {
      if (err) {
        console.log("IMAGE NOT FOUND")
      }
    });
  }
  return ;
};
module.exports = deleteFile