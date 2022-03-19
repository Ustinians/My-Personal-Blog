/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react';
import {reqArticle} from "../../api/index";
import "./index.css";
import HeaderNav from "../../components/HeaderNav";
import ArticleComment from "../../components/ArticleComment";
import CommentItem from "../../components/CommentItem";

export default function Article(props) {
  const [article,setArticle] = useState({});
  useEffect(() => {
    getArticle();
  },[])
  const getArticle = async () => {
    const {title} = props.match.params;
    console.log(title);
    const result = await reqArticle({title});
    // console.log(result);
    if(result.code === 0){
      console.log("获取文章信息成功");
      setArticle(result.data[0]);
    }
    else{
      console.log(result.msg);
    }
  }
  return (
    <div className='article'>
      <HeaderNav />
      {
        article._id ? <div className='article-view'>
          <h1 className='title'>{article.title}</h1>
          <div className='info'>
            <span className='author'>{article.author}</span>
            <span className='time'>{article.time}</span>
            <span className='tag'>{article.tag}</span>
          </div>
          <p className='desc'>{article.desc}</p>
          <div className='content'>
            {article.content}
          </div>
        </div> : null
      }
      <ArticleComment />
      <div className='article-comments'>
        {
          (article.comments && article.comments.length > 0) ? 
          <div className='comments-list'>
            {
              article.comments.map((item,index) => {
                return <CommentItem comment={item} key={index} />
              })
            }
          </div>
          :
          <div className='no-comment'>
            <p>暂时没有评论...</p>
          </div>
        }
      </div>
    </div>
  )
}
