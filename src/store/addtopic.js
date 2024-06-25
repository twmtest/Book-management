import { defineStore } from 'pinia';
import { reqAddTopic ,reqGetAllTopic,reqGetLimitTopic,reqDeleteTopic,reqDisableTopic,reqRecoverTopic,reqByNameTopic,reqByIdTopic} from '@/api';
export const TopicStore = defineStore('addtopic', {
    state: () => {
		return {
            def:0,
            TopicList:[],
            LimitList:[]
		};
	},
    getters: {},
    actions:{
        async AddTopic(data){
            let result=await reqAddTopic(data)
            
            if(result.code==200){
                alert('添加成功')
            }
        },
        async GetAllTopic(){
            let result=await reqGetAllTopic()
            if(result.code==200){
                this.def=0
                this.TopicList=result.data
            }
        },
        async GetLimitTopic(data){
            let result=await reqGetLimitTopic(data)
            if(result.code==200){
                this.def=0
                this.LimitList=result.data
            }
        },
        async DeleteTopic(data){
            let result=await reqDeleteTopic(data)
            if(result.code==200){
                alert('删除成功')
                
            }
        },
        async DisableTopic(data){
            let result=await reqDisableTopic(data)
            if(result.code==200){
                alert('下架成功')
                
            }
        },
        async RecoverTopic(data){
            let result=await reqRecoverTopic(data)
            if(result.code==200){
                alert('上架成功')
                
            }
        },
        async BynameTopic(data){
            let result=await reqByNameTopic(data)
            if(result.code==200){
                this.LimitList=result.data
                this.TopicList=this.LimitList
            }
        },
        async ByIdTopic(data){
            let result=await reqByIdTopic(data)
            if(result.code==200){
                this.LimitList=result.data
                this.TopicList=this.LimitList
            }
        }
    }
});