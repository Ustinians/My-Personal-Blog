import ajax from "./ajax";

export const reqRegister = (nickname,email,website) => ajax("/register",{nickname,email,website},"POST")

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
