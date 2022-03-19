/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,useEffect} from 'react';
import "./index.css";
import HeaderNav from "../../components/HeaderNav";
import MyArticle from '../../components/MyArticle';
import {reqArticle} from "../../api/index";

export default function TagArticles(props) {
  const [articles,setArticles] = useState([]);
  const {tag} = props.match.params;
  useEffect(() => {
    getTagArticles();
  },[tag])
  const getTagArticles = async () => {
    // console.log(tag);
    const result = await reqArticle({tag});
    // console.log(result);
    if(result.code === 0){
      setArticles(result.data);
    }
    else{
      console.log(result.msg);
    }
  }
  return (
    <div className='tag-articles'>
      <HeaderNav />
      {
        articles.length > 0 ? 
          <div className='article-list'>
          {
            articles.map((item,index) => {
              return <MyArticle article={item} key={index} />
            })
          }
          </div>
          : 
          null 
      }
    </div>
  )
}
