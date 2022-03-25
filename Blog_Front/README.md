# 我的个人博客

## 路由设计

* `Home` 首页
* `Article` 我的文章
* `About` 关于
* `Message`留言板
* `TagArticles` 文章分类列表

## MongDB数据设计

### User

* `title` 文章标题

* `desc` 文章描述

* `author` 作者

* `content` 文章内容

* `images` 文章配图

* `tag` 所属分类

* `time` 文章发表时间

* `comments` 文章评论
  
  * `user` 
    
    如果当前评论不是被回复的,则user为发送回复方
    
    否则为被回复方


