import axios from "axios";
//start进度条开始，done进度条结束
import nProgress from "nprogress";
//引进进度条样式
import "nprogress/nprogress.css";
import useStore from '@/store/index.js'
import {removeToken} from '@/utils/token'
import router from '@/router/routes.js'


const requests=axios.create({
    //基础路径，发起请求会出现api
    baseURL:"/api",
    //代表请求超时的时间，是ms
    timeout:8000
})
//请求拦截器
requests.interceptors.request.use((config)=>{
    
    const { Login } = useStore()
    if(Login.token){
        
        config.headers.Authorization = Login.token
    }
    nProgress.start();
    //config配置对象，里面有一个重要属性header请求头
    return config;
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数
    nProgress.done();
    return res.data
},(error)=>{
    const {Login} = useStore()
    if(error.response.status === 401){
        removeToken()
        Login.userInfo={}
        router.push('/login')
        return Promise.reject(new Error('登录世界过长，请重新登录'));
    }
    else if(error.response.status===400&&error.config.url==='/user/login'){
        return Promise.reject(new Error('账号或密码错误，请重新输入'));
    }else if(error.response.status===400&&error.config.url==='/user/register'){
        alert('该账户已被注册')
    }else if(error.response.status===400&&error.config.url==='/user/token'){
        removeToken()
        Login.
        router.push('/login')
        return Promise.reject(new Error('登录世界过长，请重新登录'));
    }
    else{
        return Promise.reject(new Error('fail'));
    }
    
})
export default requests;