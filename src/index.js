import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import './iconfont/iconfont.css'
import 'antd/dist/antd.css'
import './css/antd.css'
import './css/index.css'
import './css/home.css'
import './css/detail.css'

import Home from "./components/home";
import {Provider} from "react-redux";
import configureStore from "./store/store";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Home/>
</Provider>, document.getElementById("root"));
