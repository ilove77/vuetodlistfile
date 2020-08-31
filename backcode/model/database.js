const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/login', {useNewUrlParser: true })
	.then(() => console.log('數據庫連結成功'))
    .catch(() => console.log('數據庫連結失敗'))
    