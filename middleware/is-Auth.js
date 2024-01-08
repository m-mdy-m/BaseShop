module.exports = (req,res,nxt)=>{
    if(!req.session.isLogin){
        res.redirect('/signup')
    }
    nxt()
}