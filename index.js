const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');

const config = require('./config/key');
const bodyPaser = require('body-parser');
const cookiePaser = require('cookie-parser');
const {User} = require('./models/User');

const {auth} = require('./middleware/auth');

//application/x-www-form-urlencode 
app.use(bodyPaser.urlencoded({extended: true}));
//application/json
app.use(bodyPaser.json());

app.use(cookiePaser());

/* console 접속
> mongo
> db.testdb.save({'name':'park'});
> db.testdb.find()
> db.testdb.find().explain()
*/
 mongoose.connect(config.mongoURI, {
                    useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))



  app.get('/', (req, res) => {  res.send(`Let's got started~`) })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

  app.post('/api/users/register',(req,res)=>{

    //회원 가입 할때 필요한 정보들을 client에서 가져오고 DB 보관하기
    const user = new User(req.body);
    
    user.save((err, userInfo)=>{
      if(err) return res.json({success:false,err});
      return res.status(200).json({
        success:true
      })
    })
    

  }) 

  app.post('/api/users/login',(req,res)=>{

    const user = new User(req.body);

    //1. 요청된 email을 DB에서 검색 
    User.findOne({email: req.body.email}, (err, user) =>{
      if(!user){
        return res.json({
          loginSuccess: false,
          message: "No user"
        })
      }
      //2. password 체크
      user.comparePassword(req.body.password, (err, isMatch)=>{
        if(!isMatch)
          return res.json({loginSuccess:false, message:"password is wrong"});

      //3. token 생성
        user.generateToken((err, user) => {
          if(err) return res.status(400).send(err);

          // token을 저장한다.  into 쿠키 , 로컬스토리지,..
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess:true, userId:user._id})
        });
        
      });
    });

   /*
    user.save((err, userInfo)=>{
      if(err) return res.json({success:false,err});
      return res.status(200).send({success:true})
  })
  */


})
  
  app.get('/api/users/auth', auth, (req, res) =>{
    //여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True 라는 말. 
    //role : 1 이면 일반유저
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role ===0? false : true, 
      isAuth: true, 
      email: req.user.email,
      name: req.user.name
    })
  })
 
  app.get('/api/users/logout', auth, (req, res) =>{
    User.findOneAndUpdate(
      {_id: req.user._id},
      {token:""},
      (err, user)=>{
        if(err) return res.json({success:false, err});
        return res.status(200).send({success:true});
      })
  })