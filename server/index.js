var express = require("express");
var md5 = require("blueimp-md5"); // 引入md5加密
var router = express.Router();
// 引入mongoose中的User
const { User } = require("../db/models");

// 游客注册的路由
router.post("/register", (req, res) => {
    // 读取请求参数
    const { username, password, avatar } = req.body
    /**
     * 判断用户是否存在,如果存在,返回错误
     * 如果该昵称还未被注册,则执行注册用户
     */
    User.findOne({ username }, (err, user) => {
        // 如果user有值(该用户已存在)
        if (user) {
            res.send({
                code: 1,
                msg: "该用户名称已被注册"
            })
        }
        else {
            const user = { username, password: md5(password), avatar };
            User.create(user).then(doc => {
                console.log("用户注册成功");
                res.send({
                    code: 0,
                    data: {
                        // 响应数据中,不要携带密码
                        _id: user._id,
                        username: user.username,
                        avatar: user.avatar
                    }
                })
                // 用户注册成功之后直接登录,将user的_id存入cookie中
                // maxAge: 存活时间
                res.cookie("user_id", user._id, { maxAge: 1000 * 60 * 60 * 24 }); // 存活时间:一天
            }).catch(err => {
                console.log("用户注册失败", err);
            })

        }
    })
})

// 登录个人博客后台的路由(POST)


// 获取文章列表的路由(GET)
// router.get("/article",(req,res) => {
//     res.send({status: 0,data: {_id:"XXX",title:"XXX",desc:"XXX",author:"XXX",content:"XXX"}});
// })

module.exports = router;