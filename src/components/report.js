import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Select, Input, message} from 'antd'
import {Footer, Guide} from './common/layout'
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
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{header: 1}, {header: 2}], // custom button values
      [{list: 'ordered'}, {list: 'bullet'}],
      [{script: 'sub'}, {script: 'super'}], // superscript/subscript
      [{indent: '-1'}, {indent: '+1'}], // outdent/indent
      [{direction: 'rtl'}], // text direction

      [{size: ['small', false, 'large', 'huge']}], // custom dropdown
      [{header: [1, 2, 3, 4, 5, 6, false]}],

      [{color: []}, {background: []}], // dropdown with defaults from theme
      [{font: []}],
      [{align: []}],

      ['clean']
    ]
  }

  formats: [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ]

  send = () => {
    const {AccessToken} = this.props
    const {title, tab, content} = this.state

    if (title.trim() && tab !== 'select' && content.trim()) {
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
    const {location} = this.props
    return (
      <div style={{height: '101vh'}}>
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
        <ReactQuill
          value={this.state.content}
          theme={'snow'}
          onChange={this.handleContent}
          id="quill-editor"
          modules={this.modules}
          formats={this.formats}
          placeholder="请输入内容，不少于30字，支持markdown语法"
        />
        <Footer location={location} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {...state.SetAccessToken}
}
export default connect(mapStateToProps)(Report)
