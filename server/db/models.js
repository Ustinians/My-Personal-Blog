/**
 *@ 定义包含n个操作数据库集合数据的model模块
 */
// 引入mongoose
const mongoose = require("mongoose");

// 连接到指定的数据库
mongoose.connect("mongodb://localhost/blog",{useNewUrlParser : true})
    .then(() => {
        console.log("数据库连接成功");
    }).catch(err => {
        console.log("数据库连接失败",err);
    })

//@ 创建集合
//@ 设定User集合规则
/**
 *- userSchema 用户集合规则
 *     - username 用户名
 *     - password 密码
 *     - avatar 头像
 */
 const userModel = new mongoose.Schema({
    username: {required: true,trim: true,type:String},
    password: {required: true,trim: true,type:String},
    avatar: String
});

//@ 设定Article集合规则
/**
 *- articleSchema 文章集合规则
 *     - title 文章标题
 *     - desc 文章描述
 *     - author 作者
 *     - content 内容
 *     - images 文章配图
 */
 const articleSchema = new mongoose.Schema({
    title: {required: true,trim: true,type:String},
    desc: {required: true,type:String},
    author: {required: true,type:String},
    content: {required: true,type:String},
    images: Array
});

//% 创建User文档并向外暴露
const User = mongoose.model("User",userModel); // users
exports.User = User;
 
//% 创建Article文档并向外暴露
const Article = mongoose.model("Article",articleSchema); // articles
exports.Article = Article;