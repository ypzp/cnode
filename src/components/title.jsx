import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Footer, Header} from './common/layout'
import {ScrollTop, WindowHeight, ScrollHeight, formatTime} from './common/tool'
import request from '../util/request'
import {Spin} from './common/spin'

class Title extends Component {
   state = {
      data: [],
      page: 2,
      refresh: false,
      loadmore: false
   }
   //page=2是因为初始的时候已经请求过一页了
   reload = () => {
      const {pathname, search} = this.props.location //获取当前页的路径
      const type = pathname + search
      const {data, page} = this.state
      if (loadMore()) {
         this.setState({loadmore: true})
         request(getUrl(type, page)).then(res => {
            this.setState({
               data: data.concat(res.data),
               page: page + 1,
               loadmore: false
            })
         })
      }
      if (Refresh()) {
         this.setState({refresh: true})
         request(getUrl(type)).then(res => {
            this.setState({data: res.data, page: 2, refresh: false})
         })
      }
   }
   componentDidMount() {
      const {pathname, search} = this.props.location //获取当前页的路径
      const type = pathname + search
      //确保加载一次。。。
      window.onload = () => {
         request(getUrl(type)).then(res => {
            localStorage.setItem(type, JSON.stringify(res.data))
            this.setState({data: res.data, page: 2})
         })
      }
      if (localStorage[type] !== undefined)
         //从文章详情页返回到原页面
         this.setState({
            data: JSON.parse(localStorage.getItem(type))
         }) //本地缓存，避免多次请求浪费资源,恢复现场

      window.addEventListener('scroll', this.reload)
   }

   componentWillReceiveProps(nextProps) {
      document.body.scrollTop = document.body.scrollTop !== 0 ? document.body.scrollTop : 1
      const {pathname, search} = nextProps.location //不能使用this.props,在这个生命周期前并未更新
      const type = pathname + search //获取当前页的路径

      if (
         type.indexOf(this.props.location.search) < 0 || //点击当前页面也不重新请求
         localStorage.getItem(type) === null //数据存在不重新请求
      ) {
         request(getUrl(type)).then(res => {
            localStorage.setItem(type, JSON.stringify(res.data))
            this.setState({data: res.data})
         })
      } else {
         this.setState({
            data: JSON.parse(localStorage.getItem(type))
         })
      }
   }

   componentWillUnmount() {
      window.removeEventListener('scroll', this.reload)
   }
   render() {
      const {data, refresh, loadmore} = this.state
      const style = {
         marginTop: refresh === true ? '120px' : '40px',
         marginBottom: loadmore === true ? '120px' : '40px'
      }

      return (
         <div className="index" style={style}>
            <Header location={this.props.location} />
            <Spin loading={refresh} /> {data.length === 0 ? <Spin loading={true} /> : <EachTitle data={data} />}
            <div style={{height: '50px'}}>
               <Spin loading={loadmore} style={{bottom: '45px'}} />
            </div>
            <Footer location={this.props.location} />
         </div>
      )
   }
}

export const EachTitle = props => {
   return props.data.map((data, index) => {
      const {id, top, tab, good, title, author, reply_count, visit_count, create_at, last_reply_at} = data
      return (
         <div key={id + index} className="contant fadeInUp animated">
            <Link className="title" to={`/detail/${id}`}>
               <i className={top ? 'iconfont icon-top mark' : ''} />
               <i className={good ? 'iconfont icon-good mark' : ''} />
               <i
                  className={
                     tab === 'share'
                        ? 'iconfont icon-share mark'
                        : tab === 'job' ? 'iconfont icon-job mark' : 'iconfont icon-ask mark'
                  }
               />
               {title}
            </Link>
            <br />
            <div>
               <Link to={`/user/${author.loginname}`}>
                  <img src={author.avatar_url} className="avator" alt={author.loginname} />
               </Link>
               <div>
                  <p style={{marginBottom: '13px'}}>
                     <span className="loginname">{author.loginname}</span>
                     <span className="vistedCount">
                        {reply_count}/{visit_count}
                     </span>
                  </p>
                  <span style={{marginLeft: '10px'}}>{formatTime(create_at)}</span>
                  <span className="last_reply_at">{formatTime(last_reply_at)}</span>
               </div>
            </div>
         </div>
      )
   })
}

const getUrl = (type, page) => {
   if (page === undefined) return type === '/topics' ? `${type}?limit=20` : `${type}&limit=20`
   else return type === '/topics' ? `${type}?page=${page}&limit=5` : `${type}&page=${page}&limit=5`
}

let currHeight = 0,
   prevHeight = 0
const Refresh = () => {
   prevHeight = currHeight
   currHeight = ScrollTop()
   return currHeight < prevHeight && currHeight < 1.5
}
const loadMore = () => {
   return currHeight > prevHeight && Math.abs(ScrollTop() + WindowHeight() - ScrollHeight()) < 3
}

export default Title
