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

    working directory           stating area      .git directory        github
                                    (cache)
untracked       tracked
                unmodified
                modified

    실습해보기
    workspace>git> echo hello world! > a.txt

    git add 

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