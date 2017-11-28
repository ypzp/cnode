import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select, Input, message } from 'antd'
import { Footer, Tip, Guide } from './common/layout'
import request from '../util/request'

const Option = Select.Option
const { TextArea } = Input

class Report extends Component {
  state = {
    title: '',
    tab: 'select',
    content: ''
  }
  componentDidMount() {
    //request(`/message/count?accesstoken=${AccessToken}`).then(res => { })
  }
  send = () => {
    const { AccessToken } = this.props
    const { title, tab, content } = this.state

    if (title.trim() !== '' && tab !== 'select' && content.trim() !== '') {
      request(`/topics`, {
        accesstoken: AccessToken,
        title: title,
        tab: tab,
        content: content
      }).then(res => {
        message.info('发表成功')
      })
    } else {
      message.error('请填写完整')
    }
  }
  handleTab = value => {
    this.setState({ tab: value })
  }
  handleTitle = e => {
    this.setState({ title: e.target.value })
  }
  handleContent = e => {
    this.setState({ content: e.target.value })
  }
  render() {
    const { location, USER_OFF, history } = this.props
    return USER_OFF ? (
      <div>
        <Guide history={history} />
        <Tip history={history} />
      </div>
    ) : (
      <div>
        <Guide title="发表主题">
          <i onClick={this.send} className="iconfont icon-fabiao report" />
        </Guide>
        <Select defaultValue="select" onChange={this.handleTab} style={{ width: '100%', margin: '65px 0 20px 0' }}>
          <Option value="select" disabled>
            请选择发表的板块
          </Option>
          <Option value="share">分享</Option>
          <Option value="ask">问答</Option>
          <Option value="job">招聘</Option>
          <Option value="dev">客户端测试</Option>
        </Select>
        <Input onChange={this.handleTitle} placeholder="请输入标题" style={{ height: '35px' }} />
        <TextArea
          onChange={this.handleContent}
          style={{ width: '100%', height: '400px', margin: '20px 0' }}
          placeholder="请输入内容，不少于30字，支持markdown语法"
        />
        <Footer location={location} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    AccessToken: state.SetAccessToken.AccessToken,
    USER_OFF: state.SetUserStatus.OFF
  }
}
export default connect(mapStateToProps)(Report)
