import ajax from "./ajax";

export const reqRegister = (nickname,email,website) => ajax("/register",{nickname,email,website},"POST")

// 获取文章列表 GET
export const reqArticle = () => ajax("/article")

