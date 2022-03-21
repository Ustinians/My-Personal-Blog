import React from 'react';
import "./index.css"
import HomeImg from './HomeImg';
import HomeArticle from './HomeArticle';
// import { cookie } from 'express/lib/response';

export default function Home() {
  // console.log(cookie.read("user_id"));
  return (
    <div className='home'>
      <HomeImg />
      <HomeArticle />
    </div>
  )
}
