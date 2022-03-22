/**
 *@ 定义包含n个操作数据库集合数据的model模块
 */
// 引入mongoose
const mongoose = require("mongoose");

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

//% 创建User文档并向外暴露
const User = mongoose.model("User", userSchema); // users
exports.User = User;

//@ 设定Article集合规则
/**
 *- articleSchema 文章集合规则
 *     - title 文章标题
 *     - desc 文章描述
 *     - author 作者
 *     - content 内容
 *     - images 文章配图
 *     - tag 所属分类
 *     - time 文章发布时间
 *     - comments 文章评论
 *          + user 发送消息方or被回复方
 *          + replyUser 回复方
 *          + time 回复时间
 *          + content 回复内容
 */
const articleSchema = new mongoose.Schema({
    title: { required: true, trim: true, type: String },
    desc: { required: true, type: String },
    author: { required: true, type: String },
    content: { required: true, type: String },
    time: { type: String, required: true },
    tag: { type: String, required: true },
    images: Array,
    comments: Array
});

//% 创建Article文档并向外暴露
const Article = mongoose.model("Article", articleSchema); // articles
exports.Article = Article;

/**
 * - messageSchema 留言集合规则
 * - user 留言者
 * - time 留言时间
 * - content 留言内容
 */
const messageSchema = new mongoose.Schema({
    time: {type: String, required: true},
    content: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Message = mongoose.model("Message",messageSchema);
exports.Message = Message;

