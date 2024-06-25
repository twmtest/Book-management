<template>
    <div class="container">
        <div class="handle-box">
            <el-input  placeholder="书籍id" class="handle-input mr10" v-model="bookid"></el-input>
				<el-button type="primary" :icon="Search" @click="GetBookId(bookid)" >搜索</el-button>
        </div>
        <div class="handle-box">
            <el-input  placeholder="评论id" class="handle-input mr10" v-model="commentid"></el-input>
				<el-button type="primary" :icon="Search" @click="GetCommentId(commentid)" >搜索</el-button>
        </div>
        <div class="handle-box">
            <el-input  placeholder="用户id" class="handle-input mr10" v-model="userid"></el-input>
				<el-button type="primary" :icon="Search" @click="GetUserId(userid)">搜索</el-button>
        </div>
        <el-table :data="Comment.LimitComment"  border style="width: 100%" >
            <el-table-column prop="bookId" label="书籍id" width="150"  align="center"/>
            <el-table-column prop="bookName" label="书名" width="150" align="center"/>
            <el-table-column prop="userId" label="用户id" width="150" align="center" />
            <el-table-column prop="commentId" label="评论id" width="150" align="center" />
            <el-table-column prop="content" label="评论内容" width="300" align="center" />
            <el-table-column prop="creatTime" label="评论时间" width="200" align="center">
              <template #default="scope">
                <span v-if="scope.row.creatTime!=null">
                  {{ parseTime(scope.row.creatTime) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column  label="操作" width="220" align="center">
                        
						<template #default="scope">
              <el-button text :icon="Delete" class="red" @click="deleteComment(scope.row.commentId)" >
							删除评论
						</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination 
          :total="Comment.commentdata.length" 
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
  import {  Search,Delete} from '@element-plus/icons-vue';
  import useStore from '@/store';
  import { parseTime } from "@/utils/date";
  import {onMounted,ref} from 'vue'
  const userid=ref(null)
  const bookid=ref(null)
  const commentid=ref(null)
  const pageIndex=ref(1)
  onMounted(()=>{
    Comment.GetAllComment()
    Comment.GetLimitComment({"num":1,"pagesize":10})
  })
 

  const {Comment} = useStore()
  
  
  const GetCommentId=(data)=>{
    if(data!=''){
      Comment.def=1
    Comment.GetCommentId({"commentId":data})
    }
    else{
      Comment.def=0
      pageIndex.value=0
      Comment.GetAllComment()
    Comment.GetLimitComment({"num":1,"pagesize":10})
    }
  }
  const GetBookId=(data)=>{
    if(data!=''){
      Comment.def=1
    Comment.GetBookId({"bookId":data})
    }
    else{
      Comment.def=0
      pageIndex.value=0
      Comment.GetAllComment()
    Comment.GetLimitComment({"num":1,"pagesize":10})
    }
  }
  const GetUserId=(data)=>{
    if(data!=''){
      Comment.def=1
    Comment.GetUserId({"userId":data})
    }
    else{
      Comment.def=0
      pageIndex.value=0
      Comment.GetAllComment()
    Comment.GetLimitComment({"num":1,"pagesize":10})
    }
  }
  const deleteComment=(data)=>{
    Comment.DeleteComment({"commentId":data})
  }
  const handlePageChange=(currentpage)=>{
    if(Comment.def==0){
    Comment.GetLimitComment({"num":currentpage,"pagesize":10})
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
  </style>