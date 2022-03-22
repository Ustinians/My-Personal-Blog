import React from 'react';
import "./index.css"
import HomeImg from './HomeImg';
import HomeArticle from './HomeArticle';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <div className='home'>
      <HomeImg />
      <HomeArticle />
      <Footer />
    </div>
  )
}
