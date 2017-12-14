import React from 'react'
import {Tabs} from 'antd'
import {Link} from 'react-router-dom'
import {formatTime} from './tool'

const TabPane = Tabs.TabPane

const UserInfo = props => {
  return (
    <div className="user">
      <img src={props.avatar_url} className="user-view-avator" alt={props.loginname} />
      <span className='user-props'>用户名</span>:&nbsp;{props.loginname}
      <span>
        <br />
        <span><span className='user-props'>github</span>:&nbsp;{props.githubUsername}</span>
        <br />
        <span>
          <span className='user-props'>积分</span>:&nbsp;{props.score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='user-props'>注册于</span>:&nbsp;{formatTime(props.create_at)}
        </span>
      </span>
      <br />
    </div>
  )
}

const Recent = props => {
  return (
    <Tabs style={{marginBottom: '40px'}}>
      <TabPane tab="最近创建的话题" key="recent_topics">
        {props.recent_topics.map((data, index) => {
          return (
            <div key={data.title + index} className="recent">
              <Link className="user-view-title" to={`/detail/${data.id}`}>
                {data.title}
              </Link>
            </div>
          )
        })}
        {props.recent_topics.length === 0 ? '这个家伙很懒，什么也没留下' : ''}
      </TabPane>
      <TabPane tab="最近参与的话题" key="recent_replies">
        {props.recent_replies.map((data, index) => {
          return (
            <div key={data.title + index} className="recent">
              <Link className="user-view-title" to={`/detail/${data.id}`}>
                {data.title}
              </Link>
              <Link to={`/user/${data.author.loginname}`}>
                <img src={data.author.avatar_url} className="avator" alt={data.author.loginname} />
              </Link>
            </div>
          )
        })}
        {props.recent_replies.length === 0 ? '这个家伙很懒，什么也没留下' : ''}
      </TabPane>
    </Tabs>
  )
}
export {UserInfo, Recent}
