import React from 'react';
import "./index.css";
import { NavLink } from "react-router-dom"

export default function MyArticle(props) {
  const { article } = props;
  return (
    <div className='my-article'>
      <NavLink style={{width:900}} to={`/article/${article.title}`}>
        <div className='article-list'>
          <div className='article-image'>
            <img alt='' src={article.images[0]}></img>
          </div>
          <div className='article-desc'>
            <h1 className='title'>{article.title}</h1>
            <span className='author'>
              <i className='iconfont icon-user'></i>
              {article.author}
            </span>
            <span className='time'>
              <i className='iconfont icon-date'></i>
              {article.time}
            </span>
            <span className='tag'>{article.tag}</span>
            <p className='desc'>{article.desc}</p>
          </div>
        </div>        
      </NavLink>

    </div>
  )
}

