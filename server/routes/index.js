var express = require("express");
var md5 = require("blueimp-md5"); // 引入md5加密
var router = express.Router();
// 引入mongoose中的User
const { User, Article, Message, Admin } = require("../db/models");

// 管理员登陆
router.post("/login/admin",(req,res) => {
    const {username,password,remember} = req.body;
    Admin.findOne({username,password: md5(password)},(err,admin) => {
        if(admin){
            console.log("用户登陆成功!");
            if(remember){
                res.cookie("admin_info", admin, { maxAge: 1000 * 60 * 60 * 24 }); // 存活时间:7天
            }
            res.send({
                code: 0,
                data: admin
            })
        }
        else{
            console.log("登陆失败,err");
            res.send({
                code: 1,
                msg: "登陆失败" + err
            })
        }
    })
})
// 判断cookie中是否存在管理员信息
router.get("/judge/admin",(req,res) => {
    const admin_info = req.cookies.admin_info;
    if(admin_info){
        const {_id,username} = admin_info;
        res.send({
            code: 0,
            data: {_id,username}
        })
    }
    else{
        res.send({
            code: 1,
            msg: "用户还未登录!"
        })
    }
})
// 管理员退出
router.get("/exit/admin",(req,res) => {
    res.clearCookie("admin_info");
    const admin_info = req.cookies.admin_info;
    if(!admin_info){
        res.send({
            code: 0,
            data: "用户已成功退出!"
        })
    }
    else{
        res.send({
            code: 1,
            msg: "用户退出失败!"
        })
    }
})

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
            else{
                // 生成一个cookie并交给浏览器保存
                res.cookie("user_id", user._id, { maxAge: 1000 * 60 * 60 * 24 * 1 }); // 存活时间:1天        
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
                    else{
                        res.cookie("user_id", user._id, { maxAge: 1000 * 60 * 60 * 24 }); // 存活时间:1天
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
    const {_id} = req.body;
    User.findOne({_id},(err,user) => {
        if(user){
            res.send({
                code: 0,
                data: user
            })
        }
        else{
            res.send({
                code: 1,
                mag: "未找到用户信息"
            })
        }
    })
})

// 删除指定_id的用户
router.post("/delete/user",(req,res) => {
    const {_id} = req.body;
    User.findByIdAndDelete({_id},(err,user) => {
        if(user){
            console.log("删除用户成功");
            res.send({
                code: 0,
                data: user
            })
        }
        else{
            console.log("删除用户失败");
            res.send({
                code: 1,
                msg: "删除用户失败" + err
            })
        }
    })
})

// 获取所有用户信息
router.get("/find/users",(req,res) => {
    User.find({},(err,users) => {
        if(users){
            console.log("获取用户列表成功!");
            res.send({
                code: 0,
                data: users
            })
        }
        else{
            console.log("获取用户列表失败!");
            res.send({
                code: 1,
                msg: "获取用户列表失败" + err
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

// 删除文章
router.post("/delete/article",(req,res) => {
    const {_id} = req.body;
    Article.findByIdAndDelete({_id},(err,article) => {
        if(article){
            console.log("删除文章成功!");
            res.send({
                code: 0,
                data: article
            })
        }
        else{
            console.log("删除文章失败!");
            res.send({
                code: 1,
                msg: "删除文章失败" + err
            })
        }
    })
})

// 更新文章
router.post("/update/article",(req,res) => {
    const {_id,title,desc,tag,time,content,images} = req.body;
    Article.findByIdAndUpdate({_id},{title,desc,tag,time,content,images},(err,article) => {
        if(article){
            console.log("更新文章内容成功!");
            res.send({
                code: 0,
                data: article
            })
        }
        else{
            console.log("更新文章内容失败!");
            res.send({
                code: 1,
                msg: "更新文章内容失败" + err
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

// 删除留言
router.post("/delete/message",(req,res) => {
    const {_id} = req.body;
    Message.findByIdAndDelete({_id},(err,message) => {
        if(message){
            res.send({
                code: 0,
                data: message
            })
        }
        else{
            res.send({
                code: 1,
                msg: "删除留言失败!"
            })
        }
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

require("./file_upload")(router)

module.exports = router;