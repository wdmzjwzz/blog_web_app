const API = '/api'

const news = {
  getNewsList: `${API}/front/content/listByPath`,
  getNewsDetail: `${API}/front/content/get`
}

export default {
  news
}


// 新闻列表
// http://192.168.18.71:9090/api/front/content/listByPath
// 参数格式：form-data
// path 取值：news、report、event

// 新闻详情
// http://192.168.18.71:9090/api/front/content/get
// 参数格式：form-data
// id：新闻id