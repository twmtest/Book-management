import { defineStore } from 'pinia';
import {reqGetAllComment,reqGetCommentId,reqGetUserId,reqGetBookId,reqDeleteComment,reqGetLimitComment} from '@/api/index.js'
export const commentListStore = defineStore('commentlist', {
    state: () => {
		return {
            def:0,
            commentdata:[],
            LimitComment:[]
		};
	},
    getters: {},
    actions:{
        async GetAllComment(){
            let result=await reqGetAllComment()
            if(result.code==200){     
                this.def=0         
                this.commentdata=result.data
            }
        },
        async GetCommentId(data){
            let result=await reqGetCommentId(data)
            
            if(result.code==200){
                this.commentdata=result.data
                this.LimitComment=result.data
            }
        },
        async GetUserId(data){
            let result=await reqGetUserId(data)
            
            if(result.code==200){
                this.commentdata=result.data
                this.LimitComment=result.data
            }
        },
        async GetBookId(data){
            let result=await reqGetBookId(data)
            
            if(result.code==200){
                this.commentdata=result.data
                this.LimitComment=result.data
            }
        },
        async DeleteComment(data){
            let result=await reqDeleteComment(data)
            if(result.code==200){
                alert('删除成功')
            }
        },
        async GetLimitComment(data){
            let result=await reqGetLimitComment(data)
            
            if(result.code==200){
                this.def=0
                this.LimitComment=result.data
            }
        }
    }
});