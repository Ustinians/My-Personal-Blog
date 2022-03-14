// 引入mongoose
const mongoose = require("mongoose");

// 连接
mongoose.connect("mongodb://localhost/blog",{useNewUrlParser : true})
    .then(() => {
        console.log("数据库连接成功");
    }).catch(err => {
        console.log("数据库连接失败",err);
    })

//@ 创建集合
//@ 设定集合规则
/**
 *- articleSchema 文章集合规则
 *     - title 文章标题
 *     - desc 文章描述
 *     - author 作者
 *     - content 内容
 *     - images 文章配图
 */
const articleSchema = new mongoose.Schema({
    name: {required: true,trim: true,type:String},
    desc: {required: true,type:String},
    author: {required: true,type:String},
    content: {required: true,type:String},
    import: Array
});

//@ 创建文档
const Article = mongoose.model("Article",articleSchema); // articles