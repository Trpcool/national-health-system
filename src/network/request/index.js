import Request from './request'
import {BASE_URL,TIMEOUT}  from '../config'
const instance = new Request({
    baseURL:BASE_URL,
    timeout:TIMEOUT
})
export default instance