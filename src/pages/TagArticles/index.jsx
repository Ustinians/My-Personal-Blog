/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,useEffect} from 'react';
import "./index.css";
import HeaderNav from "../../components/HeaderNav";
import MyArticle from '../../components/MyArticle';
import {reqArticle} from "../../api/index";

export default function TagArticles(props) {
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(false);
  const {tag} = props.match.params;
  useEffect(() => {
    getTagArticles();
  },[tag])
  const getTagArticles = async () => {
    // console.log(tag);
    setLoading(true);
    const result = await reqArticle({tag});
    // console.log(result);
    setLoading(false);
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
        !loading ? 
          <div className='article-list'>
          {
            articles.map((item,index) => {
              return <MyArticle article={item} articles={articles} number={index} key={index} />
            })
          }
          </div>
          : 
          <div className='loading'>
            <p className='loading-text'>数据正在加载中...</p>
          </div>
      }
    </div>
  )
}
