const mongoose = require("mongoose")
const projectsitemschema = new mongoose.Schema({
   acc:{
    type: String,
    required:true,
   },
   index:{
       type:Number,
    //    如果沒有create index 就會使用default的值
       default:0,
       required:true
   },
   items:{
       type: Array,
       default:[],
       required:true,
       
   }
})

const projectitems = mongoose.model("projectitems",projectsitemschema)
// // 註冊頁面
//  user.create({acc:"555555",pass:"44444444"}).then(res =>{
//     console.log(res)
// })
module.exports = projectitems