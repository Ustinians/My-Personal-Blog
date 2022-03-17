import React from 'react';
import "./index.css";
import HeaderNav from '../../../components/HeaderNav';

export default function HomeImg() {
    return (
        <div className='home-img'>
            <HeaderNav />
            <div className="container">
                <div className='content'>
                    <div className="prose">
                        <p className='welcome'>躺在云朵上</p>
                        {/* <p>我不害怕计算机，我害怕没有计算机。</p> */}
                        <p>I'm not afraid of computers. I'm afraid of not having computers.</p>
                        {/* <p>每个人应该寻找适合自己的东西，做自己喜欢做的事情；做自己擅长做的事情。</p> */}
                        <p>Everyone should find the right thing for themselves, do what they like to do;Do what you're good at.</p>
                        {/* <p>迭代者为人，递归者为神。</p> */}
                        <p>Iterator is human,recursion is god.</p>
                        {/* <p>我愿在计算机的道路上，越走越远。</p> */}
                        <p>I would like to go further and further on the road of computer. </p>
                    </div>
                </div>
                <div className='arrow-down'>
                    <i className='iconfont icon-arrow-down'></i>
                </div>
            </div>

        </div>
    )
}
