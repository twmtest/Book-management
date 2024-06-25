<template>
    <div class="container">
        <div class="handle-box">
            <el-input  placeholder="书籍名称" class="handle-input mr10" v-model="bookname"></el-input>
				<el-button type="primary" :icon="Search" @click="SearName">搜索</el-button>
        </div>
        <div class="handle-box">
            <el-input  placeholder="书籍id" class="handle-input mr10" v-model="bookid"></el-input>
				<el-button type="primary" :icon="Search" @click="SearchId">搜索</el-button>
        </div>
        
        <el-table :data="Book.LimitList"  border style="width: 100%" >
            <el-table-column prop="bookid" label="id" width="150"  align="center"/>
            <el-table-column prop="bookName" label="书名" width="150" align="center"/>
            <el-table-column prop="bookAuther" label="作者" width="150" align="center"/>
            <el-table-column prop="bookIntroduce" label="介绍" width="150" align="center"  >
              <template #default="scope">
                <span class="introduce" @click="dialogVisible = true">{{ scope.row.bookIntroduce }}</span>
                <div class="dialog">
                  <el-dialog
                  v-model="dialogVisible"
                  title="书籍完整介绍"
                  width="30%"
                  top="500px"
                  :modal="false"
                >
                 <span>{{ scope.row.bookIntroduce }}</span>
                </el-dialog>
                </div>
              </template>
            </el-table-column>
            <el-table-column  label="图片" width="150" align="center" >
                  <template #default="scope">
                    <el-image
                            class="table-td-thumb"
                            :src="scope.row.bookImg"
                            :z-index="10"
                            :preview-src-list="[scope.row.bookImg]"
                            preview-teleported
                    >
                    </el-image>
                    
                  </template>
            </el-table-column>
            
            <el-table-column  label="操作" width="660" align="center">
              <template #default="scope">          
						<el-button text  :icon="Delete" class="red"  @click="DeleteBook(scope.row.bookid)">
							删除图书
						</el-button>
            <el-button text  :icon="Close" class="red"  @click="DisableBook(scope.row.bookid)">
							禁用图书
						</el-button>
            <el-button text  :icon="Check" class="red"  @click="RecoverBook(scope.row.bookid)">
							启用图书
						</el-button>
          </template> 
            </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination 
          :total="Book.BookList.length" 
          v-model:current-page="pageIndex" 
          :page-size="5" 
          @current-change="handlePageChange"
           background
					layout="total, prev, pager, next"
          >
        </el-pagination>
        </div>
        
    </div>
  </template>
  
  <script setup>
  import {ref,onMounted} from 'vue'
  import {  Search,Delete,Close,Check} from '@element-plus/icons-vue';
  import useStore from '@/store';
  onMounted(()=>{
    Book.GetBook()
    Book.GetLimitBook({"num":1,"pagesize":10,"show":0})
  })
  
  const {Book} =useStore()
  const bookname=ref(null)
  const bookid=ref(null)
  const dialogVisible = ref(false)
  const pageIndex=ref(1)
  

const SearName=()=>{
  if(bookname.value==''){
    Book.GetBook()
    Book.GetLimitBook({"num":1,"pagesize":10,"show":0})
  }else{
  Book.ByNameGet({"bookName":bookname.value,"show":0})
  Book.def=1
  }
}
const SearchId=()=>{
  if(bookid.value==''){
    
    Book.GetBook()
    Book.GetLimitBook({"num":1,"pagesize":10,"show":0})
  }else{
    Book.def=1
  Book.ByIdGet({"bookid":bookid.value,"show":0})
  }
}
const DeleteBook=(data)=>{
  Book.DeleteBook({"bookid":data})
  Book.GetBook()
  Book.GetLimitBook({"num":pageIndex.value,"pagesize":10,"show":0})
    
    
}
const DisableBook=(data)=>{
  Book.DisableBook({"bookid":data})
}
const RecoverBook=(data)=>{
  Book.RecoverBook({"bookid":data})
}
const handlePageChange=(currentpage)=>{
    if(Book.def==0)
    {
      Book.GetLimitBook({"num":currentpage,"pagesize":10,"show":0})
    }
    else if(Book.def==1){
      pageIndex.value=1
      Book.LimitList=Book.BookList
    }
    
  }
// const stateFormat=(row, column,cellValue)=>{
//   if (!cellValue) return ''
//       if (cellValue.length > 10) {       //最长固定显示10个字符
//         return cellValue.slice(0, 10) + '...'
//       }
//       return cellValue

// }
  </script>
  
  <style scoped>
  .container {
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}
    .el-button{
        margin-left: 10px;
    }
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-input {
	width: 300px;
}
.red {
	color: #F56C6C;
}
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
.introduce{
  
max-width: 10em;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}

  </style>