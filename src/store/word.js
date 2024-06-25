import { defineStore } from 'pinia';
import {reqGetAllWord,reqGetLimitWord,reqByUserGetWord,reqByIdGetWord,reqDeleteWord,reqAllWordUserId} from '@/api';
export const useWordStore = defineStore('word', {
    state: () => {
		return {
         def:0,
         list:null,
         wordlist:[]
		};
	},
    getters: {},
    actions:{
        async GetAllWord(){
            let result=await reqGetAllWord()
            if(result.code==200){
                this.list=result.data
            }
        },
        async GetLimitWord(data){
            let result=await reqGetLimitWord(data)
            if(result.code==200){
                this.def=0
                this.wordlist=result.data
            }
        },
        async ByUserGetWord(data){
            let result=await reqByUserGetWord(data)
            if(result.code==200){
                this.def=1
                this.wordlist=result.data
                
            }
        },
        async ByIdGetWord(data){
            let result=await reqByIdGetWord(data)
            if(result.code==200){
                this.wordlist=result.data
                this.list=1
                if(this.list==1&&this.wordlist.length>1){
                    this.wordlist=result.data
                }
            }
        },
        async DeleteWord(data){
            let result=await reqDeleteWord(data)
            if(result.code==200){
                alert('删除成功')
            }
        },
        async AllUserId(data){
            let result=await reqAllWordUserId(data)
            if(result.code==200){
                this.list=result.data
            }
        }
     }
});