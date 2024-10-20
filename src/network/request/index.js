import Request from './request'
import {BASE_URL,TIMEOUT}  from '../config'
const instance = new Request({
    baseURL:BASE_URL,
    timeout:TIMEOUT
})
instance.get("/").then(res=>console.log(res)).catch(err=>console.log(err))
export default instance