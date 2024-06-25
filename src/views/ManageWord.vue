<template>
    <div class="container">
        <div class="handle-box">
            <el-input  placeholder="用户id" class="handle-input mr10" v-model="userid"></el-input>
				<el-button type="primary" :icon="Search" @click="SearUserid">搜索</el-button>
        </div>
        <div class="handle-box">
            <el-input  placeholder="评论id" class="handle-input mr10" v-model="wordid"></el-input>
				<el-button type="primary" :icon="Search" @click="SearchWordid">搜索</el-button>
        </div>
        
        <el-table :data="Word.wordlist"  border style="width: 100%" >
            <el-table-column prop="id" label="评论id" width="150"  align="center"/>
            <el-table-column prop="userId" label="用户id" width="150" align="center"/>
            <el-table-column prop="userName" label="用户名" width="150" align="center"/>
            <el-table-column prop="creatTime" label="评论时间" width="200" align="center">
              <template #default="scope">
                <span v-if="scope.row.time!=null">
                  {{ parseTime(scope.row.time) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="留言内容" width="150" align="center"/>
            <el-table-column  label="操作" width="220" align="center">
              <template #default="scope">          
						<el-button text  :icon="Delete" class="red"  @click="DeleteWord(scope.row.id)">
							删除留言
						</el-button>
           
          </template> 
            </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination 
          :total="parseInt(Word.list)" 
          v-model:current-page="pageIndex" 
          :page-size="10" 
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
  import { parseTime } from "@/utils/date";
  import {  Search,Delete} from '@element-plus/icons-vue';
  import useStore from '@/store';
  const {Word} =useStore()
  const userid = ref()
  const wordid = ref()
  let pageIndex = ref(1)
  onMounted(()=>{
   Word.GetAllWord()
   Word.GetLimitWord({"num":1,"pagesize":10})
  })
  const handlePageChange=(currentpage)=>{
    if(Word.def==0){
        Word.GetLimitWord({"num":currentpage,"pagesize":10})
    }else if(Word.def==1){
        Word.ByUserGetWord({"num":currentpage,"pagesize":10,"userId":userid.value})
    }else{
      Word.ByIdGetWord({"id":wordid.value})
    }
}
  const DeleteWord=(data)=>{
    Word.DeleteWord({"id":data})
  }
 const SearUserid=()=>{
  if(userid.value==''){
      
      Word.GetAllWord()
      Word.GetLimitWord({"num":1,"pagesize":10})
    }
    else{
    Word.ByUserGetWord({"num":1,"pagesize":10,"userId":userid.value})
    Word.AllUserId({"userId":userid.value})
    pageIndex.value=1
    }
 }
 const SearchWordid=()=>{
    if(wordid.value==''){
      
      Word.GetAllWord()
      Word.GetLimitWord({"num":1,"pagesize":10})
    }else{
    Word.def=2
    Word.ByIdGetWord({"id":wordid.value})
  }
   
 }

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