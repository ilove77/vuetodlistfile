const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const Session = require('express-session')
const app = express()
app.use(express.static(__dirname))
// app.use(cors())
app.use(cors(
    {
        origin: 'http://localhost:8080', //指定某路徑才可以攜帶cookie
        credentials: true //允許跨域
    }
))
app.use(Session({
    secret: 'your-random-secret-19890913007',
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/'
    }
}));

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
require("./model/database")
const user = require("./model/user")
const project = require('./model/project')
const projectitems = require('./model/projectitems')
// User部分 //////////////////////////////////////////////////
// 登入有無成功的驗證
app.post('/success', async (req, res) => {
    let flag = await user.findOne({ acc: req.body.acc, pass: req.body.pass })
    res.json(flag)
})
// 註冊帳號的驗證
app.get('/loginacc', async (req, res) => {
    let flag = await user.findOne({ acc: req.query.value })
    console.log(flag)
    if (flag) {
        res.json(true)
    }
    //    res.json(flag)
    res.json(flag)
})

app.get('/loginpass', async (req, res) => {
    let flag = await user.findOne({ pass: req.query.value })
    if (flag) {
        res.json(true)
    }
    res.json(flag)
})
app.post('/applicate', async (req, res) => {
    let flag1 = await user.findOne({ acc: req.body.acc })
    let flag2 = await user.findOne({ pass: req.body.pass })
    const [flag3, flag4] = await Promise.all([flag1, flag2])
    if (flag3 || flag4) {
        res.json(false)
    }
    try {
        await user.create({ acc: req.body.acc, pass: req.body.pass })
        res.json(true)
    }
    catch (err) {
        console.log(err)
    }


})
//  //////////////////////////////////////////////////
// 專案部分/////////////////////////////////////////////////////////////////////////
app.get('/addproject', async (req, res) => {
    let flag = await project.findOne({ acc: req.query.acc })
    console.log(flag)
    if (!flag) {
        await project.create({ acc: req.query.acc, items: req.query.item })
    }
    else {
        try {
            if (flag.items.some((value) => {
                console.log(value)
                console.log(req.query.items)
                return req.query.item == value

            })
            ) {
                console.log(2)
                res.json(false)
                return
            }

            flag.items.push(req.query.item)


            await project.updateOne({ acc: req.query.acc }, {
                acc: req.query.acc,
                items: flag.items
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    res.end()

})
app.get('/getproject', async (req, res) => {

    let flag = await project.findOne({ acc: req.query.acc })
    if (!flag) {
        res.json([])
    }
    else {
        res.json(flag.items)
    }
})
app.get('/deleteproject', async (req, res) => {
    let flag = await project.findOne({acc:req.query.acc})
    flag.items.splice(req.query.index,1)
    await project.updateOne({acc:req.query.acc},{items:flag.items})
    let flag1 = await projectitems.findOne({acc:req.query.acc})
    flag1.items.splice(req.query.index,1)
    await projectitems.updateOne({acc:req.query.acc},{items:flag1.items})
    res.json({
        flag:flag.items,flag1:flag1.items
    })
})
app.get('/editprojectname', async (req, res) => {
    await project.updateOne({acc:req.query.acc}, { items: req.query.item })
    // console.log(flag)
    let flag = await project.findOne({ acc: req.query.acc })
    res.json(flag.items)

})
// 專案的代辦事項
app.get('/addprojectitems', async (req, res) => {
    let flag = await projectitems.findOne({ acc: req.query.acc })
    // console.log(flag.items)
    if (!flag) {
        let xx = await projectitems.create({ acc: req.query.acc })
        // let projectlist = await project.findOne({acc:req.query.acc})
        console.log(xx)


        let flag1 = await projectitems.findOne({ acc: req.query.acc })
        const arrays = []
        arrays.push(req.query.items)
        for (let i = 0; i < req.query.projectlen; i++) {
            if (i == req.query.index) {
                flag1.items.push(arrays)
                // flag1.items[i].push(arrays)
            }
            else {
                flag1.items.push([])
            }
        }
        // flag1.items.push(arrays)
        await projectitems.updateOne({ acc: req.query.acc }, {
            items: flag1.items
        })
        // res.end()
    }
    else {
        if (req.query.projectlen > flag.items.length) {
            let i = req.query.projectlen
            let j = flag.items.length
            for (let k = i; k >= j; k--) {
                flag.items.push([])
            }
        }
        // [[[]],[]]
        try {

            flag.items[req.query.index].push(req.query.items)
            // console.log(flag.items)
            let gg = await projectitems.updateOne({ acc: req.query.acc }, {
                // acc: req.query.acc,
                items: flag.items
            })
            console.log(flag.items)
        }
        catch (err) {
            console.log(err)
        }
    }
    res.end()
})
app.get('/getprojectitems', async (req, res) => {
    let flag = await projectitems.findOne({ acc: req.query.acc })
    if (!flag) {
        res.json([])
    }
    else {
        res.json(flag.items)
    }
})
app.get('/editprojectitems', async (req, res) => {
    try {
        let flag1 = await projectitems.findOne({ acc: req.query.acc })
        let index = req.query.index
        let index2 = req.query.index2
        console.log(flag1.items[index][index2])
        console.log(req.query.items)
        flag1.items[index][index2] = req.query.items
        await projectitems.updateOne({ acc: req.query.acc }, {
            items: flag1.items
        })
        res.json(flag1.items)
    }
    catch (err) {
        console.log(err)
    }
})
app.get('/editprojectitemsenddate', async (req, res) => {
    try {
        let flag1 = await projectitems.findOne({ acc: req.query.acc })
        // console.log(flag1+"123")
        // console.log(req.query)
        flag1.items[req.query.index][req.query.index2][5] = new Date().toISOString().substr(0, 10)
        flag1.items[req.query.index][req.query.index2][6] = req.query.flag
        await projectitems.updateOne({ acc: req.query.acc }, {
            items: flag1.items
        })
        res.end()
    }
    catch (err) {
        console.log(err)
    }
})
// app.get('')
// app.get('/gg',async(req,res)=> {
//     console.log(4564646465)
//     console.log(req.query.acc)
//     await projectitems.create({acc:req.query.acc,items:req.query.items})
//     res.end() 
// })
const oauth = require('./model/OAuth')
app.get('/ss', (req, res) => {
    console.log(1)
    let url = oauth.getAuthurl()
    res.json(url)
})
app.get('/callback', async (req, res) => {
    let code = req.query.code
    let session = req.session
    // console.log(req.session)
    // console.log(req.sessionID)
    const oauth2client = oauth.getOAuthclient()
    const { tokens } = await oauth2client.getToken(code)
    oauth2client.setCredentials(tokens)
    req.session["tokens"] = tokens
    console.log(req.session)
    console.log(req.sessionID)
    // req.session.user = {A:2}

    res.end()

    // res.json(req.sessionID)
})
app.get('/callback2', async (req, res) => {
    console.log(req.session["tokens"])
    const oauth2Client = oauth.getOAuthclient();
    oauth2Client.setCredentials(req.session["tokens"]);
    // userId: 'me',auth: oauth2Client,
    let re = await oauth.plus.people.get({
        auth: oauth2Client,
        resourceName: 'people/me'
    })
    console.log(re + "8798798879798798798979")
    res.end()
    // }
    // catch(err) {
    //     console.log(err)
    //     res.end()
    // }

})
if(process.env.NODE_ENV === "production") {
    app.use(ServeStatic(path.join(__dirname,"/..")))
    
    app.get(/.*/, function (req, res) {
        res.sendFile(path.join(__dirname,"/..","/index.html"));
      });
    }
    // 6050
app.listen(process.env.PORT || 6050)
console.log("成功")