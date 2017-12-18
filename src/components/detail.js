import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Input, message, Button} from 'antd'
import {Guide, Tip} from './common/layout'
import {Spin} from './common/spin'
import {toBottom, formatTime, debounce} from './common/tool'
import request from '../util/request'
import {setTimeout} from 'timers'

const {TextArea} = Input
let History = null /**全局共享history变量 */
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        replies: [],
        author: {}
      },
      floor: 10,
      text: ''
    }
    History = this.props.history
  }
  reload = () => {
    if (toBottom()) {
      this.setState({
        floor: this.state.floor + 10
      })
    }
  }
  componentDidMount() {
    document.body.scrollTop = 0 //不加这个每次进去scroll都是上次浏览过的
    /**
     * 请求数据
     */
    this.update()
    window.addEventListener('scroll', debounce(this.reload, 100, false))
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', debounce(this.reload, 100, false))
  }
  /**
   * 回复消息后更新数据
   */
  update = () => {
    const {id} = this.props.match.params
    request(`/topic/${id}`)
      .then(res => {
        this.setState({data: res.data})
      })
      .catch(error => {
        console.log('error')
      })
  }
  handleText = e => {
    this.setState({text: e.target.value})
  }
  send = () => {
    const {text} = this.state
    const {id} = this.props.match.params
    const {accesstoken} = this.props
    if (text.trim() !== '')
      request(`/topic/${id}/replies`, {
        accesstoken: accesstoken,
        content: text
      }).then(res => {
        if (res.success && res.success === true) {
          this.setState({text: ''})
          message.info('发送成功')
          this.update()
        }
      })
    else message.error('总要写点什么吧')
  }
  render() {
    const {data} = this.state
    const {accesstoken, UserID} = this.props
    return (
      <div>
        <Guide history={this.props.history} title={data.title} />
        {!data.content ? (
          <Spin loading={!data.content} />
        ) : (
          <div>
            <User data={data} />
            <h2 className="topic-title">{data.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: `${data.content.replace('markdown-text', 'topic-text')}`
              }}
            />
            <div className="topic-reply-count">
              共<span style={{color: '#108ee9'}}>{data.reply_count}</span>条回复
            </div>
            <Anwser
              replies={data.replies}
              floor={this.state.floor}
              accesstoken={accesstoken}
              id={data.id}
              myname={UserID.loginname}
              authorname={data.author.loginname}
              update={this.update}
            />
            {accesstoken === '' ? (
              <Tip style={{padding: '20px 0'}} />
            ) : (
              <div>
                <TextArea
                  id="reply-textArea"
                  placeholder="支持markdown语法"
                  onChange={this.handleText}
                  value={this.state.text}
                />
                <Button id="reply-btn" onClick={this.send}>
                  回复
                </Button>
              </div>
            )}
            <div style={{height: '35px'}} />
          </div>
        )}
      </div>
    )
  }
}

const User = props => {
  const {data} = props
  return (
    <div className="topic-content">
      <Link to={`/user/${data.author.loginname}`}>
        <img src={data.author.avatar_url} className="avator" alt={data.author.loginname} />
      </Link>
      <p style={{marginBottom: '13px'}}>
        <span className="loginname">{data.author.loginname}</span>
        <span className="visted-count">阅读:{data.visit_count}</span>
      </p>
      <span style={{marginLeft: '10px'}}>{formatTime(data.create_at)}</span>
      <span className="last_reply_at">{formatTime(data.last_reply_at)}</span>
    </div>
  )
}
/**
 * 回帖楼层
 * @param {*} props
 */
const Anwser = props => {
  return props.replies.map((anwser, index) => {
    if (index < props.floor)
      return (
        <div className="anwser" key={anwser.author.loginname + index}>
          <Link to={`/user/${anwser.author.loginname}`}>
            <img src={anwser.author.avatar_url} className="avator" alt={anwser.author.loginname} />
          </Link>
          <span className="loginname">
            {anwser.author.loginname}&nbsp;{anwser.author.loginname === props.authorname ? '楼主' : ''}
          </span>
          <span style={{fontSize: '1.3rem'}}>{formatTime(anwser.create_at)}</span>
          <span style={{fontSize: '1.3rem', float: 'right', marginRight: '8px'}}>{`${index + 1}楼`}</span>
          <div
            dangerouslySetInnerHTML={{
              __html: `${anwser.content}`
            }}
            key={index}
          />
          <div style={{textAlign: 'right'}}>
            <Ups
              length={anwser.ups.length}
              id={anwser.id}
              accesstoken={props.accesstoken}
              authorname={props.authorname}
              anwsername={anwser.author.loginname}
              myname={props.myname}
            />
            <Reply
              id={props.id}
              accesstoken={props.accesstoken}
              reply_id={anwser.id}
              loginname={anwser.author.loginname}
              update={props.update}
            />
          </div>
        </div>
      )
    else return <div key={index} />
  })
}
/**
 * 点赞
 */
class Ups extends Component {
  state = {
    action: ''
  }
  sendUps = () => {
    const {id, accesstoken, myname, anwsername} = this.props
    if (accesstoken !== '') {
      if (anwsername !== myname) {
        request(`/reply/${id}/ups`, {accesstoken: accesstoken}).then(res => {
          this.setState({action: res.action})
        })
      } else {
        message.warning('不能给自己点赞哦')
      }
    } else {
      message.info('您还没有登陆')
      setTimeout(() => {
        History.push('/my/login')
      }, 300)
    }
  }
  render() {
    const {action} = this.state
    const {length} = this.props
    const style = {
      color: action === 'up' ? '#108ee9' : 'rgba(0,0,0,0.65)',
      fontWeight: action === 'up' ? '600' : '400'
    }
    return (
      <span>
        <i className="iconfont icon-dianzan" style={style} onClick={this.sendUps}>
          <span className="icon-dianzan-num">{action === 'up' ? length + 1 : length}</span>
        </i>
      </span>
    )
  }
}
/**
 * 评论
 */
class Reply extends Component {
  state = {
    status: false,
    content: ''
  }
  handleReply = () => {
    this.setState({
      status: !this.state.status
    })
  }
  handleValue = e => {
    this.setState({content: e.target.value})
  }
  send = () => {
    const {content} = this.state
    const {id, accesstoken, reply_id} = this.props
    if (accesstoken !== '') {
      if (content.trim() !== '')
        request(`/topic/${id}/replies`, {
          accesstoken: accesstoken,
          content: content,
          reply_id: reply_id
        }).then(res => {
          if (res.success && res.success === true) this.setState({status: false})
          message.success('发送成功')
          this.props.update() //发送完数据更新
        })
      else message.warning('总要写点什么吧')
    } else {
      message.info('您还没有登陆')
    }
  }
  render() {
    const {status} = this.state
    const {loginname} = this.props
    return (
      <span>
        <i className="iconfont icon-huifu" onClick={this.handleReply} />
        {status ? (
          <p>
            <TextArea
              style={{height: '60px'}}
              onChange={this.handleValue}
              defaultValue={`@${loginname} `}
              minLength={`@${loginname}`.length}
            />
            <Button style={{float: 'left'}} onClick={this.send}>
              回复
            </Button>
          </p>
        ) : null}
      </span>
    )
  }
}
const mapStateToProps = state => {
  return {
    accesstoken: state.SetAccessToken.AccessToken,
    UserID: state.SetUserID.UserID
  }
}

export default connect(mapStateToProps)(Detail)
