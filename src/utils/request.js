import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './auth'

const NODE_ENV = process.env.NODE_ENV

const devServer = ''
const prodServer = ''
const base = NODE_ENV === 'development' ? devServer : NODE_ENV === 'production' ? prodServer : devServer

const service = axios.create({
  baseURL: base, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000 // request timeout
})

service.interceptors.request.use(
  config => {
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    console.log('error', error)
    return Promise.reject(error)
  }
)

export default service
