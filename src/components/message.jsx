import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Tabs} from 'antd'
import {Link} from 'react-router-dom'
import {formatTime} from './common/tool'
import {Footer, Tip, Guide} from './common/layout'
import request from '../util/request'

const TabPane = Tabs.TabPane

class Message extends Component {
  state = {
    messCount: 0,
    has_read_messages: [],
    hasnot_read_messages: []
  }
  componentWillMount() {
    const {AccessToken} = this.props
    if (AccessToken !== '') {
      request(`/message/count?accesstoken=${AccessToken}`).then(res => {
        if (res.data !== 0) this.setState({messCount: 2})
      })
      request(`/messages?accesstoken=${AccessToken}`).then(res => {
        this.setState({
          has_read_messages: res.data.has_read_messages,
          hasnot_read_messages: res.data.hasnot_read_messages
        })
      })
    }
  }

  render() {
    const {location, USER_OFF, history} = this.props
    const {has_read_messages, hasnot_read_messages} = this.state
    return (
      <div>
        {USER_OFF ? (
          <div>
            <Guide history={history} />
            <Tip history={history} />
          </div>
        ) : (
          <div style={{marginTop: '45px', marginBottom: '50px'}}>
            <Guide title={'消息'} />
            <Tabs defaultActiveKey="has_read">
              <TabPane tab="未读消息" key="has_read">
                <Title messages={hasnot_read_messages} />
              </TabPane>
              <TabPane tab="已读消息" key="hasnot_read">
                <Title messages={has_read_messages} />
              </TabPane>
            </Tabs>
            <Footer location={location} />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {AccessToken: state.SetAccessToken.AccessToken, USER_OFF: state.SetUserStatus.OFF}
}
const Title = ({messages}) => {
  if (messages.length !== 0) {
    return messages.map((item, index) => {
      const {author, create_at, topic, type} = item
      const {last_reply_at, id, title} = topic
      return (
        <div key={id + index} className="contant fadeInUp animated">
          <Link className="title" to={`/detail/${id}`}>
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
              </p>
              <span style={{marginLeft: '10px'}}>
                在{formatTime(create_at)}
                <span style={{color: 'red'}}>{type === 'at' ? '@' : '回复'}</span>了你
              </span>
              <span className="last_reply_at">{formatTime(last_reply_at)}</span>
            </div>
          </div>
        </div>
      )
    })
  } else {
    return <div style={{textAlign: 'center'}}>暂无消息</div>
  }
}
export default connect(mapStateToProps)(Message)
