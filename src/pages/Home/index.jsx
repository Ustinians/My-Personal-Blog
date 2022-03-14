import React from 'react';
import "./index.css"
import HomeImg from './HomeImg';
import HomeArticle from './HomeArticle';

export default function Home() {
  return (
    <div className='home'>
      <HomeImg />
      <HomeArticle />
    </div>
  )
}
