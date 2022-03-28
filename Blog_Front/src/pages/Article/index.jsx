/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from 'react';
import {reqArticle} from "../../api/index";
import "./index.css";
import ArticleComment from "../../components/ArticleComment";

import {NavLink} from "react-router-dom";

export default function Article(props) {
  const [article,setArticle] = useState({});
  const {number,articles} = props.location.state;
  useEffect(() => {
    getArticle();
  },number)
  // 当提交评论之后刷新组件
  const updateComments = () => {
    getArticle();
  }
  const getArticle = async () => {
    const {title} = props.match.params;
    const result = await reqArticle({title});
    // console.log(result);
    if(result.code === 0){
      setArticle(result.data[0]);
    }
    else{
      console.log(result.msg);
    }
  }
  return (
    <div className='article'>
      {
        article._id ? <div className='article-view'>
          <h1 className='title'>{article.title}</h1>
          <div className='info'>
            <span className='author'>
              <i className='iconfont icon-user'></i>
              {article.author}
            </span>
            <span className='time'>{article.time}</span>
            <span className='tag'><i className='iconfont icon-tag'></i>{article.tag}</span>
          </div>
          <p className='desc'>{article.desc}</p>
          <div dangerouslySetInnerHTML={{__html:article.content}}></div>
          {/* <div className='content'>{article.content}</div> */}
        </div> : <div className='article-loading'>
          <p>文章正在加载中...</p>
        </div>
      }
      <div className='jump-others'>
        {/* 跳转到前一篇文章或者后一篇文章 */}
        <div className='prev'>
          {
            number > 0 ?
            <NavLink to={{pathname: `/article/${articles[number-1].title}`,state:{article:articles[number-1],number:number-1,articles}}}>
              <div className='jump-article'>
                <span className='jump-btn'>前一篇</span>
                <h2 className='jump-title'>{articles[number-1].title}</h2>
              </div>
            </NavLink>
            :
            null
          }
        </div>
        <div className='next'>
          {
            number < articles.length-1 ?
            <NavLink to={{pathname: `/article/${articles[number+1].title}`,state:{article:articles[number+1],number:number+1,articles}}}>
              <div className='jump-article'>
                <span className='jump-btn'>后一篇</span>
                <h2 className='jump-title'>{articles[number+1].title}</h2>
              </div>
            </NavLink>
            :
            null
          }
        </div>
      </div>
      <ArticleComment comments={article.comments} article_id={article._id} updateComments={updateComments} />
    </div>
  )
}
