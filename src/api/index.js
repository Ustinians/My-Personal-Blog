import ajax from "./ajax";

export const reqRegister = (user) => ajax("/register",user,"POST")

// 获取文章列表 GET
export const reqArticles = () => ajax("/articles");

// 根据_id值获取文章 POST
export const reqArticle = (article) => ajax("/article",article,"POST");

// 获取留言列表
export const reqMessages = () => ajax("/messages");

// 添加留言
export const reqAddMessage = (message) => ajax("/add/message",message,"POST");

// 根据用户id寻找用户信息
export const reqFindUser = (user) => ajax("/find/user",user,"POST");

// 判断用户当前是否登录/注册(cookie中是否有值)
export const reqJudgeLogin = () => ajax("/judge/login")

// 向文章中添加评论
export const reqCommentToArticle = (comments,_id) => ajax("/add/comment/article",{comments,_id},"POST");
