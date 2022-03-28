import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom"; // 引入路由相关
import "./App.css";
// 引入需要的路由组件
import Home from "./pages/Home";
import TagArticles from "./pages/TagArticles";
import Article from "./pages/Article";
import Person from "./pages/Person";
import About from "./pages/About";
import Message from "./pages/Message";
import HeaderNav from "./components/HeaderNav";
import Layout from "./pages/Layout";

import Footer from "./components/Footer"

function App(props) {
  return (
    // 防止路由跳转的时候页面不刷新,加上key
    <div className="app" key={props.location.key}>
      <HeaderNav />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Layout path="/">
          <Switch>
          <Route path="/articles/:tag" exact component={TagArticles}></Route>
          <Route path="/article/:title" component={Article}></Route>
          <Route path="/person" component={Person}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/message" component={Message}></Route>
          <Redirect to="/"></Redirect>
          </Switch>
          <Footer />
        </Layout>
      </Switch>
      
    </div>
  );
}

export default withRouter(App);