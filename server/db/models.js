/**
 *@ 定义包含n个操作数据库集合数据的model模块
 */
// 引入mongoose
const mongoose = require("mongoose");
const { formateDate } = require("../../src/utils/dateUtils.js")

// 连接到指定的数据库
mongoose.connect("mongodb://localhost:27017/blog", { useNewUrlParser: true })
    .then(() => {
        console.log("数据库连接成功");
    }).catch(err => {
        console.log("数据库连接失败", err);
    })


//@ 创建集合
//@ 设定User集合规则
/**
 *- userSchema 用户集合规则
 *     - email 邮箱
 *     - nickname 用户名
 *     - website 网站
 */
const userSchema = new mongoose.Schema({
    email: { required: true, trim: true, type: String },
    nickname: { required: true, trim: true, type: String },
    website: { type: String }
});

//@ 设定Article集合规则
/**
 *- articleSchema 文章集合规则
 *     - title 文章标题
 *     - desc 文章描述
 *     - author 作者
 *     - content 内容
 *     - images 文章配图
 *     - time 文章发布时间
 */
const articleSchema = new mongoose.Schema({
    title: { required: true, trim: true, type: String },
    desc: { required: true, type: String },
    author: { required: true, type: String },
    content: { required: true, type: String },
    time: { type: String, required: true },
    tag: { type: String, required: true },
    images: Array
});

//% 创建User文档并向外暴露
const User = mongoose.model("User", userSchema); // users
exports.User = User;

//% 创建Article文档并向外暴露
const Article = mongoose.model("Article", articleSchema); // articles
exports.Article = Article;


Article.updateOne({name: "春风不度玉门关"},{tag: "前端学习"}).then(result => console.log(result))
Article.updateOne({name: "城南旧事"},{tag: "前端学习"}).then(result => console.log(result))
Article.updateOne({name: "故国的春天"},{tag: "技术笔记"}).then(result => console.log(result))
Article.updateOne({name: "故国的春天"},{tag: "技术笔记"}).then(result => console.log(result))