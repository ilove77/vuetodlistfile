const mongoose = require("mongoose")
const projectschema = new mongoose.Schema({
   acc:{
    type: String,
    required:true,
   },
   items:{
       type: Array,
       default:[],
       required:true,
       
   }
})

const project = mongoose.model("project",projectschema)
// // 註冊頁面
//  user.create({acc:"555555",pass:"44444444"}).then(res =>{
//     console.log(res)
// })
module.exports = project