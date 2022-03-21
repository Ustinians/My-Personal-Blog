import React from 'react';
import "./index.css";
import { NavLink } from "react-router-dom"

export default function MyArticle(props) {
  const { article, number, articles } = props;
  return (
    <div className='my-article'>
      {
        (article.images && article.images.length > 0) ?
          <NavLink style={{ width: 900 }} to={{ pathname: `/article/${article.title}`, state: { article, number, articles } }}>
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
                <span className='tag'>
                  <i className='iconfont icon-tag'></i>
                  {article.tag}
                </span>
                <p className='desc'>{article.desc}</p>
              </div>
            </div>
          </NavLink>
          :
          <div className='no-image'>
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
              <span className='tag'>
                <i className='iconfont icon-tag'></i>
                {article.tag}
              </span>
              <p className='desc'>{article.desc}</p>
            </div>
          </div>
      }
    </div>
  )
}

