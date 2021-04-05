const mongoose = require('mongoose');
// 连接数据库
if(process.env.NODE_ENV == "production"){
    mongoose.connect(
        "mongodb+srv://yizhi:h94u454s06g4@vuetodolist.woh4b.mongodb.net/vuetodolist?retryWrites=true&w=majority",{useNewUrlParser: true})
    .then(() => {
        console.log("成功")
    })
    .catch(() => {
        console.log("失敗")
    })
}
else{
mongoose.connect('mongodb://localhost:27017/login', {useNewUrlParser: true })
	.then(() => console.log('數據庫連結成功'))
    .catch(() => console.log('數據庫連結失敗'))
}