var express = require("express");
// var md5 = require("blueimp-md5"); // 引入md5加密
var router = express.Router();
// 引入mongoose中的User
const { User, Article, Message } = require("../db/models");

// 游客注册的路由
router.post("/register", (req, res) => {
    // 读取请求参数
    const { email, nickname, website, ischecked } = req.body;
    /**
     * 判断用户是否存在,如果存在,返回错误
     * 如果该昵称还未被注册,则执行注册用户
     */
    User.findOne({ email: email }, (err, user) => {
        // 如果user有值(该用户已存在,登陆)
        if (user) {
            // 该用户存在,则登陆成功
            if(ischecked){
                // 生成一个cookie并交给浏览器保存
                res.cookie("user_id", user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 }); // 存活时间:7天        
                console.log(user._id);        
            }
            if(nickname !== user.nickname || website !== user.website){
                // 如果第二次登陆输入的用户名,个人网站和第一次不一样,更新一下
                User.updateOne({email},{nickname,website},(err,newUser) => {
                    if(newUser){
                        // 更新成功
                        res.send({
                            code: 0,
                            data: newUser
                        })
                    }
                    else{
                        res.send({
                            code: 1,
                            msg: "更新用户信息失败" + err
                        })
                    }
                })
            }
            else{
                res.send({
                    code: 0,
                    data: user
                })
            }
        }
        else {
            new User({ email, nickname, website }).save((err,user) => {
                if(user){
                    if(ischecked){
                        // 用户注册成功之后直接登录,将user的_id存入cookie中
                        // maxAge: 存活时间
                        res.cookie("user_id", user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 }); // 存活时间:7天
                        console.log(user._id);
                    }
                    // 返回包含user的json格式
                    console.log("用户注册成功");
                    res.send({
                        code: 0,
                        data: user
                    })
                }
                else{
                    res.send({
                        code: 1,
                        msg: "注册用户失败," + err
                    })
                }
            })
        }
    })
})


// 判断当前是否已经登录
router.get("/judge/login",(req,res) => {
    // 从请求的cookie中得到user_id
    const user_id = req.cookies.user_id;
    // 如果不存在,证明还未登录/注册
    if(!user_id){
        res.send({
            code: 1,
            msg: "用户还未登录/注册"
        })
    }
    else{
        res.send({
            code: 0,
            data: {
                user_id
            }
        })
    }
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

// 添加文章
router.post("/add/article",(req,res) => {
    new Article(req.body).save((err,article) => {
        if(article){
            console.log("添加文章成功");
            res.send({
                code: 0,
                data: article 
            })
        }
        else{
            console.log("添加文章失败");
            res.send({
                code: 1,
                msg: "添加文章失败" + err
            })
        }
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

// 向文章中添加评论
router.post("/add/comment/article",(req,res) => {
    const {comments,_id} = req.body;
    Article.updateOne({_id},{comments},(err,article) => {
        if(article){
            res.send({
                code: 0,
                data: article
            })
        }
        else{
            res.send({
                code: 1,
                msg: "添加评论失败" + err
            })
        }
    })
})

module.exports = router;