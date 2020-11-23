const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');

const config = require('./config/key');
const bodyPaser = require('body-parser');
const {User} = require('./models/User');

//application/x-www-form-urlencode 
app.use(bodyPaser.urlencoded({extended: true}));
//application/json
app.use(bodyPaser.json());

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

app.post('/register',(req,res)=>{

  //회원 가입 할때 필요한 정보들을 client에서 가져오고 DB 보관하기
  const user = new User(req.body);
  

  user.save((err, userInfo)=>{
    if(err) return res.json({success:false,err});
    return res.status(200).json({
      success:true
    })
  })


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


/* Next 몽고DB의 model on the scheme 
   - models 폴더 생성
   - User.js 파일 생성 
   - 코딩 
        몽구스 모듈 가져오기
        스키마 작성하기 
*/