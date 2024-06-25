import { defineStore } from 'pinia';
import { reqGetAllBook,reqByNameGetBook,reqByIdGetBook,reqDeleteBook,reqDisableBook,reqRecoverBook,reqGetLimitBook,reqChangeLabel} from '@/api';
export const bookListStore = defineStore('booklist', {
    state: () => {
		return {
            def:0,
            BookList:[],
            LimitList:[]
		};
	},
    getters: {},
    actions:{
        
        async GetBook(){
            let result=await reqGetAllBook()
            
            if(result.code==200){
                this.BookList=result.data
            }
        },
        async ByIdGet(data){
            let result=await reqByIdGetBook(data)
            
            if(result.code==200){
                this.BookList=result.data
                this.LimitList=result.data
            }
        },
        async ByNameGet(data){
            let result=await reqByNameGetBook(data)
            if(result.code==200){
                this.BookList=result.data
                this.LimitList=result.data
            }
        },
        async DeleteBook(data){
            let result=await reqDeleteBook(data)
            if(result.code==200){
                alert('删除成功')
                this.GetBook()
            }
        },
        async DisableBook(data){
            let result=await reqDisableBook(data)
            if(result.code==200){
                alert('禁用成功')
                
            }
        },
        async RecoverBook(data){
            let result=await reqRecoverBook(data)
            if(result.code==200){
                alert('恢复成功')
                
            }
        },
        async GetLimitBook(data){
            let result=await reqGetLimitBook(data)
            if(result.code==200){
                this.LimitList=result.data
            }
        },
        async ChangeLabel(data){
            let result=await reqChangeLabel(data)
            if(result.code==200){
                alert('修改成功')
            }
        }
    }
});