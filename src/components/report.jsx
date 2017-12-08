import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Select, Input, message} from 'antd'
import {Footer, Tip, Guide} from './common/layout'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import request from '../util/request'

const Option = Select.Option
class Report extends Component {
  state = {
    title: '',
    tab: 'select',
    content: ''
  }
  modules: {
    toolbar: [
      [{ 'header': [1, 2,3,4,5,6, false] },{'font':[]}],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  formats: [
    'header','font','size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  con
  componentDidMount() {
    //request(`/message/count?accesstoken=${AccessToken}`).then(res => { })
  }
  send = () => {
    const {AccessToken} = this.props
    const {title, tab, content} = this.state

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
    this.setState({tab: value})
  }
  handleTitle = e => {
    this.setState({title: e.target.value})
  }
  handleContent = value => {
    this.setState({content: value})
  }
  render() {
    const {location, USER_OFF, history} = this.props
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
        <Select defaultValue="select" onChange={this.handleTab} style={{width: '100%', margin: '65px 0 20px 0'}}>
          <Option value="select" disabled>
            请选择发表的板块
          </Option>
          <Option value="share">分享</Option>
          <Option value="ask">问答</Option>
          <Option value="job">招聘</Option>
          <Option value="dev">客户端测试</Option>
        </Select>
        <Input onChange={this.handleTitle} placeholder="请输入标题" style={{height: '35px'}} />
        <ReactQuill value={this.state.content} onChange={this.handleContent} id="quill-editor" modules={this.modules} formats={this.formats}/>
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
