import {message} from 'antd'

function checkStatus(res) {
  if (res.status < 200 || res.status > 300) throw new Error('出错了')
  else return res.json()
}

/*function qstringfy(data) {
  let str = "";
  for (let i in data) 
    str += i + "="+data[i] + "&";
  return str.substring(0, str.length - 1);
}*/

export default function request(url, data) {
  if (data === undefined)
    return fetch(`https://cnodejs.org/api/v1${url}`)
      .then(res => {
        return checkStatus(res)
      })
      .catch(error => {
        message.error('请求失败')
      })
  else
    return fetch(`https://cnodejs.org/api/v1${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        return checkStatus(res)
      })
      .catch(error => {
        message.error('请求失败')
      })
}
