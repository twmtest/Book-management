import { defineStore } from 'pinia';
import { reqUpdateNews } from '@/api';
export const NewsStore = defineStore('updatenews', {
    state: () => {
		return {
            
		};
	},
    getters: {},
    actions:{
        async UpdateNews(data){
            let result=await reqUpdateNews(data)
            if(result.code==200){
                alert('更新成功')
            }
        }
    }
});