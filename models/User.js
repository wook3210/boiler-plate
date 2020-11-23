const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength: 50
    },
    email:{
        type:String,
        trim: true,
        unique:1
    },
    password:{
        type:String,
        minlength: 5
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}

/*Next Git 
----------------------------------------------------------------------------------------------------------------
    working directory           stating area      .git directory(Local)        github (REMOTE)
                                    (cache)                                     github.com
untracked       tracked
                unmodified
                modified
----------------------------------------------------------------------------------------------------------------
    실습해보기

    > git init  깃 저장소를 만든다.

    
    > echo node_modules > .gitignore       노드 모듈 제외하기
    > git add     
    > git commit -m " first commit "             로컬에 올린고얌     
    > eval $(ssh-agent -s)                  SSH에전트를 백그라운드에 켠다.

*안전하게 SSH를 이용해서 리모트와 연동하자
    > ls -a ~/.ssh
    > ssh-keygen -t ed25519 -C "your_email@example.com"     SSH 키 만들기 
      *C:/users/wooks/.ssh  이 위치에 생김
    > ssh-agent bash        ssh에이전트 뭐 초기화 하는 거라네
    > ssh-add -k ~/.ssh/id_ed25519   프라이빗키를 ssh에이전트에 Add 싴ㄴ거다
        Identity added: /c/Users/wook3/.ssh/id_ed25519 (wook3210@gmail.com)

    >  vi로 .pub 파일 열어서 복사해
    >  퍼블릭키를 깃헙에 세팅하고
    >  

    아래는 유투브 보고 
    workspace>git> echo hello world! > a.txt

    echo ellie >> a.txt

    git add *.css
    
    echo *.log > .gitignore

    터미널에서 기다리고 VSCODE사용해 비교하기 
    > git config --global -e

    commit해보기 
    > git commit

    > git log

    > git commit -m "initalize porject"

    > git commit -am "first version"

*/