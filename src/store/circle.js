import { defineStore } from 'pinia';
import {reqGetAllCircle, reqDeleteCircle} from '@/api/index.js'
export const useCircleStore = defineStore('circle', {
	state: () => {
		return {
           circleList:[]
		};
	},
	getters: {},
	actions: {
        async GetAllCircle(){
            let result =await reqGetAllCircle()
            if(result.code==200){
                this.circleList=result.data
            }
        },
        async DeleteCircle(data){
            let result=await  reqDeleteCircle(data)
            if(result.code==200){
                alert('删除成功')
            }
        }
    }
});
