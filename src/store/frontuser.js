import { defineStore } from 'pinia';
import {reqGetUser,reqDeleteUser,reqDisableUser,reqRecoverUser,reqGetLimit,reqSearchUserName,reqSearchUserId} from '@/api/index.js'
export const frontUserStore = defineStore('frontuser', {
    state: () => {
		return {
            def:0,
            frontUserInfo:[],
            limitUserInfo:[]
		};
	},
    getters: {},
    actions:{
        async GetUser(){
            let result=await reqGetUser()
            console.log(result);
            console.log(result.code);
            if(result.code==200){
                this.def=0
                this.frontUserInfo=[]
                for(let i of result.data){
                    if(i.role==0){
                        this.frontUserInfo.push(i)
                    }
                }
                
            }
        },
        async DeleteUser(data){
            let result=await reqDeleteUser(data)
            if(result.code==200){
                alert('删除用户成功')
            }else{
                alert('删除失败')
            }
        },
        async DisableUser(data){
            let result=await reqDisableUser(data)
            if(result.code==200){
                alert('禁用用户成功')
            }else{
                alert('禁用失败')
            }
        },
        async RecoverUser(data){
            let result=await reqRecoverUser(data)
            if(result.code==200){
                alert('启用用户成功')
            }else{
                alert('启用失败')
            }
        },
        async GetLimitUser(data){
            let result=await reqGetLimit(data)
            
            if(result.code==200){
                this.def=0
                this.limitUserInfo=[]
                for(let i of result.data){
                    if(i.role==0){
                        this.limitUserInfo.push(i)
                    }
                    
                }
            }
        },
        async GetUserName(data){
            let result=await reqSearchUserName(data)
            
            if(result.code==200){
                if(result.data[0].role==0){
                    this.frontUserInfo=result.data
                    this.limitUserInfo=result.data
                }
                else{
                    alert('查无此人')
                }
            }
        },
        async GetUserId(data){
            let result=await reqSearchUserId(data)
            
            if(result.code==200){
                if(result.data[0].role==0){
                    this.frontUserInfo=result.data
                    this.limitUserInfo=result.data
                }
                else{
                    alert('查无此人')
                }
            }
        },
    }
});