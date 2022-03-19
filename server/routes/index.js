var express = require("express");
// var md5 = require("blueimp-md5"); // 引入md5加密
var router = express.Router();
// 引入mongoose中的User
const { User, Article, Message } = require("../db/models");

// 游客注册的路由
router.post("/register", (req, res) => {
    // 读取请求参数
    const { email, nickname, website } = req.body;
    /**
     * 判断用户是否存在,如果存在,返回错误
     * 如果该昵称还未被注册,则执行注册用户
     */
    User.findOne({ email: email }, (err, user) => {
        // 如果user有值(该用户已存在)
        if (user) {
            res.send({
                code: 1,
                msg: "该邮箱已被注册"
            })
        }
        else {
            new User({ email, nickname, website }).save((err,user) => {
                // 返回包含user的json格式
                console.log("用户注册成功");
                res.send({
                    code: 0,
                    data: user // 返回数据中不要携带密码
                })
                // 用户注册成功之后直接登录,将user的_id存入cookie中
                // maxAge: 存活时间
                res.cookie("user_id", user._id, { maxAge: 1000 * 60 * 60 * 24 }); // 存活时间:一天
            })
        }
    })
})

// 登录个人博客后台的路由(POST)
router.post("/login",(req,res) => {
    const {email,website,nickname} = req.body;
    // 根据email和password查询数据库,如果没有,返回错误提示信息
    User.findOne({ email: email }, (err, user) => {
        console.log(user);
        // 如果user有值(该用户已存在)
        if (user) {
            // 该用户存在,则登陆成功
            // 生成一个cookie并交给浏览器保存
            res.cookie("user_id", user._id, { maxAge: 1000 * 60 * 60 * 24 }); // 存活时间:一天
            res.send({
                code: 0,
                data: user
            })
        }
        else {
            res.send({
                code: 1,
                msg: "找不到该用户"
            })
        }
    })
})

// 根据_id值获取用户信息
router.post("/find/user",(req,res) => {
    User.findOne(req.body,(err,user) => {
        if(user){
            res.send({
                code: 0,
                data: user
            })
        }
        else{
            res.send({
                code: 1,
                mas: "未找到用户信息"
            })
        }
    })
})

// 获取文章列表的路由(GET)
router.get("/articles",(req,res) => {
    Article.find().then(doc => {
        console.log("获取文章列表成功");
        res.send({
            code: 0,
            data: doc
        })
    }).catch(err => {
        console.log("获取文章列表失败",err);
        res.send({
            code: 1,
            msg: "获取文章列表失败" + err
        })
    })
})

// 根据传入的信息获取文章
router.post("/article",(req,res) => {
    Article.find(req.body).then(doc => {
        console.log("获取文章成功");
        res.send({
            code: 0,
            data: doc
        })
    }).catch(err => {
        console.log("获取文章信息失败",err);
        res.send({
            code: 1,
            msg: "获取文章信息失败"
        })
    })
})

// 获取当前留言板信息
router.get("/messages",(req,res) => {
    Message.find().then(doc => {
        console.log("获取留言列表成功");
        res.send({
            code: 0,
            data: doc
        })
    }).catch(err => {
        console.log("获取留言列表失败",err);
        res.send({
            code: 1,
            msg: "获取留言列表失败" + err
        })
    })
})

// 向留言板中添加信息
router.post("/add/message",(req,res) => {
    const {time,content,user} = req.body;
    new Message({ time,content,user }).save((err,message) => {
        // 返回包含user的json格式
        console.log("添加留言成功");
        res.send({
            code: 0,
            data: message 
        })
    })
})


module.exports = router;