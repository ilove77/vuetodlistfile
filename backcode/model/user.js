const mongoose = require("mongoose")
const userschema = new mongoose.Schema({
    acc:{
        type: String,
        required:true,
    },
    pass:{
        type:String,
        required:true,
    }
})

const user = mongoose.model("user",userschema)
// // 註冊頁面
//  user.create({acc:"555555",pass:"44444444"}).then(res =>{
//     console.log(res)
// })
module.exports = user