const {User} = require('../models/User');

let auth = (req, res, next) =>{

    //인증 처리를 하는곳

    //클라이언트 쿠키에서 토큰을 가져온다.    
    let token = req.cookies.x_auth;

    //토큰을 복호화 한 후 유저를 DB에서 찾는다.
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false, error:true});

        req.toekn = token;
        req.user = user;
        next(); //미들웨어 통과 했으니 서비스로 진행
    })

    //if exists 인증 ok

    //else 인증 fail

}

module.exports = { auth }