import React, {Component} from "react";
import {Link} from "react-router-dom";

export const Tip = (props) => {
    return <div id="tip-login" style={props.style}>
        您还未登陆,请<Link to="/my/login">登陆</Link>
    </div>

}
Tip.defaultProps = {
    style: {},
    title:"详情"
}
export const Guide = props => {
    const {title, history} = props;
    const back = () => {
        history.goBack(); //这个history本身没有,其他组件传给他的
    };

    return (
        <div className="guide">
            {props.children?props.children:""}
            {props.history!==undefined?<span className="back icon-fanhui iconfont" onClick={back}/>:""}
            <h4 className="guide-title">{title}</h4>
        </div>
    );
};
Guide.defaultProps = {
    title: ""
}

export const Header = props => {
    const addClass = e => {
        let li = document
            .getElementById("header")
            .children;
        if (e.target.parentNode.id !== "header") { //防止点击li标签也执行
            for (let i = 0; i < li.length; ++i) {
                if (li[i].className === "h_on") 
                    li[i].removeAttribute("class");
                }
            e.target.parentNode.className = "h_on";
        } //点击的是a标签,需要设置的样式是父节点
    };

    const {location} = props;
    return (
        <header>
            <ul id="header">
                {Htab.map((data, index) => {
                    return (
                        <li
                            key={index}
                            onClick={addClass}
                            className={data.path === location.pathname + location.search
                            ? "h_on"
                            : ""}>
                            {/*默认第一个*/}
                            <Link to={data.path}>{data.text}</Link>
                        </li>
                    );
                })}
            </ul>
        </header>
    );
}

export const Footer = props => {
    const addClass = e => {
        let li = document.getElementById("footer").children;
        if (e.target.parentNode.id !== "footer" && e.target.className.indexOf("iconfont") < 0 && e.target.parentNode.className !== "f_0") {
            //避免重复点击执行 防止点击li标签也执行
            for (let i = 0; i < li.length; ++i) {
                if (li[i].className === "f_on") 
                    li[i].removeAttribute("class");
                }
            e.target.parentNode.className = "f_on";
        } //点击的是a标签,需要设置的样式是父节点
        if (e.target.parentNode.id === "footer") {
            for (let i = 0; i < li.length; ++i) {
                if (li[i].className === "f_on") 
                    li[i].removeAttribute("class");
                }
            e.target.className = "f_on";
        }
    };

    const {location} = props; //解决刷新后恢复现场问题

    return (
        <footer>
            <ul id="footer">
                {tab.map((data, index) => {
                    return (
                        <li
                            key={index}
                            onClick={addClass}   
                            className={data.path === location.pathname
                            ? "f_on"
                            : ""}>
                            {/*默认第一个*/}
                            <Link to={data.path} className={data.class} style={{display:"grid"}}>
                            {data.text}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </footer>
    );
}

export class BackTop extends Component {
    state = {
        isShow: false
    }
    back = () => {
        document.body.scrollTop=1000;
        let Interval = setInterval(() => {
            if (document.body.scrollTop > 25) 
                document.body.scrollTop -= 20;
            else {
                document.body.scrollTop = 4;
                clearInterval(Interval)
            }
        }, 1)
    }
    show = () => {
        if (document.body.scrollTop > document.body.clientHeight && !this.state.isShow) 
            this.setState({isShow: true})
        else if (document.body.scrollTop < document.body.clientHeight && this.state.isShow) 
            this.setState({isShow: false})
    }
    componentDidMount() {
        window.addEventListener("scroll", this.show)
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.show)
    }
    render() {
        const {isShow} = this.state;
        return isShow
            ? <div className="iconfont icon-backtop" onClick={this.back}></div>
            : ""
    }
}

const tab = [
    {
        text: "首页",
        path: "/topics",
        class: "icon-shouye iconfont"
    }, {
        text: "发表",
        path: "/my/report",
        class: "icon-fabiao iconfont"
    }, {
        text: "消息",
        path: "/my/message",
        class: "icon-xiaoxi iconfont"
    }, {
        text: "我的",
        path: "/my/view",
        class: "icon-wode iconfont"
    }
];
const Htab = [
    {
        text: "全部",
        path: "/topics"
    }, {
        text: "精华",
        path: "/topics?tab=good"
    }, {
        text: "分享",
        path: "/topics?tab=share"
    }, {
        text: "问答",
        path: "/topics?tab=ask"
    }, {
        text: "招聘",
        path: "/topics?tab=job"
    }
];
