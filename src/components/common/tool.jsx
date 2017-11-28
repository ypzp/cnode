//滚动条在Y轴上的滚动距离

const ScrollTop = () => {
  let scrollTop = 0,
    bodyScrollTop = 0,
    documentScrollTop = 0
  if (document.body) {
    bodyScrollTop = document.body.scrollTop
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop
  return scrollTop
}

//文档的总高度

const ScrollHeight = () => {
  let scrollHeight = 0,
    bodyScrollHeight = 0,
    documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight = bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight
  return scrollHeight
}

//浏览器视口的高度

const WindowHeight = () => {
  let windowHeight = 0
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}

const loadMore = () => {
  return Math.abs(ScrollTop() + WindowHeight() - ScrollHeight()) < 1
}

const formatTime = data => {
  const current = new Date()
  let time = new Date(data)
  let year = time.getFullYear()
  let month = time.getMonth()
  let day = time.getDate()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let seconds = time.getSeconds()
  if (year < current.getFullYear()) return current.getFullYear() - year + '年前'
  else if (month < current.getMonth()) return current.getMonth() - month + '月前'
  else if (day < current.getDate()) return current.getDate() - day + '天前'
  else if (hour < current.getHours()) return current.getHours() - hour + '小时前'
  else if (minute < current.getMinutes()) return current.getMinutes() - minute + '分钟前'
  else return current.getSeconds() - seconds + '秒前'
}
export {loadMore, ScrollTop, WindowHeight, ScrollHeight, formatTime}
