import React from "react";
import { Switch, Route, Redirect } from "react-router-dom"; // 引入路由相关
import "./App.css";
// 引入需要的路由组件
import Home from "./pages/Home";
import TagArticles from "./pages/TagArticles";
import Article from "./pages/Article";
import Person from "./pages/Person";
import About from "./pages/About";
import Message from "./pages/Message";

export default function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/articles/:tag" exact component={TagArticles}></Route>
        <Route path="/article/:title" component={Article}></Route>
        <Route path="/person" component={Person}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/message" component={Message}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </div>
  );
}
