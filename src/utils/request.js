import axios from 'axios'
import {Message} from 'element-ui'
import {getToken} from './auth'
import QS from 'qs'
const NODE_ENV = process.env.NODE_ENV

const devServer = 'http://127.0.0.1:8000/'
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

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(base + url, {
      params: params
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err)
    })
  });
}
// QS.stringify(params)
export function del(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(base + url, {data: params})
      .then(res => {
        resolve(res);
      })
      .catch(err =>{
        reject(err)
      })
  });
}

// export default get
