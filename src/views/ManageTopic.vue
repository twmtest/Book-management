<template>
  <div class="container">
    <div class="handle-box">
            <el-input  placeholder="标题" class="handle-input mr10" v-model="topicname"></el-input>
				<el-button type="primary" :icon="Search" @click="SearName">搜索</el-button>
        </div>
        <div class="handle-box">
            <el-input  placeholder="id" class="handle-input mr10" v-model="topicid"></el-input>
				<el-button type="primary" :icon="Search" @click="SearchId">搜索</el-button>
        <el-table :data="Topic.LimitList"  border style="width: 100%" >
            <el-table-column prop=essayId label="ID" width="150"  align="center"/>
            <el-table-column prop=title label="标题" width="150" align="center"/>
            <el-table-column prop=label label="标签" width="150" align="center"/>
            <el-table-column prop=content label="内容" width="150"  align="center">
                <template #default="scope">
                
                  <router-link :to="{name:'showtopic',params:{content:scope.row.content}}">点击查看内容</router-link>
                
              </template>
            </el-table-column>
            <el-table-column prop="creatTime" label="上传时间" width="200" align="center">
              <template #default="scope">
                <span v-if="scope.row.creatTime!=null">
                  {{ parseTime(scope.row.creatTime) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column  label="操作" width="660" align="center">
            <template #default="scope">          
						<el-button text  :icon="Delete" class="red"  @click="DeleteTopic(scope.row.essayId)">
							删除文章
						</el-button>
            
          </template> 
            </el-table-column>
           
        </el-table>
        <div class="pagination">
          <el-pagination 
          :total="Topic.TopicList.length" 
          v-model:current-page="pageIndex" 
          :page-size="5"
          @current-change="handlePageChange"
          background
					layout="total, prev, pager, next"
          >
          </el-pagination>
        </div>
           
    </div>
    </div>
</template>

<script setup>
import {  Search,Delete,Close,Check } from '@element-plus/icons-vue';
 import { parseTime } from "@/utils/date";
import { onMounted,ref} from 'vue';
import useStore from '@/store';
onMounted(()=>{
Topic.GetAllTopic()
Topic.GetLimitTopic({"num":1,"pagesize":5})
})
const topicname=ref(null)
const topicid=ref(null)
const {Topic} =useStore()
const pageIndex=ref(1)
const handlePageChange=(currentpage)=>{
  if(Topic.def==0){
    Topic.GetLimitTopic({"num":currentpage,"pagesize":5})
  }
}
const DeleteTopic=(essayId)=>{
    Topic.DeleteTopic({"essayId":essayId})
    Topic.GetAllTopic()
    Topic.GetLimitTopic({"num":pageIndex.value,"pagesize":5})
    
  }

  const SearName=()=>{
  if(topicname.value!=''){
    Topic.def=1
  Topic.BynameTopic({"title":topicname.value})
  }else{
    Topic.def=1
    Topic.GetAllTopic()
    Topic.GetLimitTopic({"num":1,"pagesize":5})
  }
}
const SearchId=()=>{
  if(topicid.value!=''){
    Topic.def=1
  Topic.ByIdTopic({"essayId":topicid.value})
  }else{
    Topic.def=1
    Topic.GetAllTopic()
    Topic.GetLimitTopic({"num":1,"pagesize":5})
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
</style>