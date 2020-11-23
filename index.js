const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');

/* console 접속
> mongo
> db.testdb.save({'name':'park'});
> db.testdb.find()
> db.testdb.find().explain()
*/
 mongoose.connect('mongodb://localhost:27017', {
                    useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!')
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