import React from 'react';
import "./index.css";

export default function MyArticle(props) {
    const {article} = props;
    // console.log(article);
  return (
    <div className='my-article'>
        <div className='article-list'>
          {
            article.images ? <div className='article-image'>
                <img alt='' src={article.images[0]}></img>
            </div>
            : 
            null
          }
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
              <p className='desc'>{article.desc}</p>
          </div>
        </div>
    </div>
  )
}
