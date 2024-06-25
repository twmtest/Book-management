import { defineStore } from 'pinia';
import {getToken,setToken,removeToken} from '@/utils/token'
import {reqUserLogin,reqLogOut,reqGetOwner} from '@/api/index.js'
export const useLoginStore = defineStore('login', {
	state: () => {
		return {
            token:getToken(),
            userInfo:{}
		};
	},
	getters: {},
	actions: {
		async userLogin(data){
            
            let result =  await reqUserLogin(data)
            
            if(result.code==200){
              
               this.token=result.data.token
               this.userInfo=result.data.data
               setToken(result.data.token)
               
            }else{
              alert('账号或密码错误')
            }
        },
   
    async userLogOut(){
      let result = await reqLogOut();
      if(result.code==200){
        this.token='';
        this.userInfo={};
        removeToken();
        
      }else{
        return Promise.reject(new Error('faile'))
       }
    },
    async getOwner(data){
      let result = await reqGetOwner(data)
      if(result.code==200){
        this.userInfo=result.data
      }
    }   
        
	}
});
