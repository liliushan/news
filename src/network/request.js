import axios from 'axios'
import qs from 'qs'

function request(config) {
  let instance = axios.create({
    //  创建实例发送网络请求
    baseURL: 'http://api.cms.liulongbin.top/api',
    timeout: 5000
  })
  //  设置请求拦截器
  if (config.method === 'post') {
    //  处理post请求
    instance.interceptors.request.use(config => {
      config.data = qs.stringify(config.data)
      return config
    })
  }
  instance.interceptors.response.use(result =>{
    return result.data
  })
  return instance(config)
  //  axios在执行成后会返回一个promise并调用resolve方法
  //  axios在执行失败后也会创建promise并调用reject方法
}

function request1(config) {
  let instance = axios.create({
    //  创建实例发送网络请求
    baseURL: 'http://106.13.70.93',
    timeout: 5000
  })
  //  设置请求拦截器
  if (config.method === 'post') {
    //  处理post请求
    instance.interceptors.request.use(config => {
      config.data = qs.stringify(config.data)
      return config
    })
  }
  instance.interceptors.response.use(result =>{
    return result.data
  })
  return instance(config)
  //  axios在执行成后会返回一个promise并调用resolve方法
  //  axios在执行失败后也会创建promise并调用reject方法
}

function request2(config) {
  let instance = axios.create({
    //  创建实例发送网络请求
    timeout: 5000
  })
  //  设置请求拦截器
  if (config.method === 'post') {
    //  处理post请求
    instance.interceptors.request.use(config => {
      config.data = qs.stringify(config.data)
      return config
    })
  }
  instance.interceptors.response.use(result =>{
    return result.data
  })
  return instance(config)
  //  axios在执行成后会返回一个promise并调用resolve方法
  //  axios在执行失败后也会创建promise并调用reject方法
}
export {request,request1,request2}