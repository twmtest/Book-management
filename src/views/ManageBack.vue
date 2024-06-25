<template>
    <div class="container">
        <div class="handle-box">
          <el-input  placeholder="用户名称" class="handle-input mr10" v-model="Name"></el-input>
				<el-button type="primary" :icon="Search" @click="SearchName" >搜索</el-button>
        <el-input  placeholder="用户ID" class="handle-input mr10" v-model="Id"></el-input>
				<el-button type="primary" :icon="Search" @click="SearchId" >搜索</el-button>
                <el-button type="primary" :icon="Plus" @click="dialogVisible = true" >添加人员</el-button>
        </div>
        <el-table :data="Back.limitUserInfo"  border style="width: 100%" >
            <el-table-column prop=id label="ID" width="150"  align="center"/>
            <el-table-column prop=username label="用户名" width="150" align="center"/>
           
            
            <el-table-column  label="操作" width="660" align="center">
            <template #default="scope">          
						<el-button text  :icon="Delete" class="red"  @click="deleteUser(scope.row.username)">
							删除账号
						</el-button>
            <el-button text  :icon="Close" class="red"  @click="DisableUser(scope.row.username)">
							禁用账号
						</el-button>
            <el-button text  :icon="Check" class="red"  @click="RecoverUser(scope.row.username)">
							启用账号
						</el-button>
          </template> 
            </el-table-column>
           
        </el-table>
        <div class="pagination">
          <el-pagination 
          :total="Back.backUserInfo.length" 
          v-model:current-page="pageIndex" 
          :page-size="3"
          @current-change="handlePageChange"
          background
					layout="total, prev, pager, next"
          >
          </el-pagination>
        </div>
            <el-dialog
                v-model="dialogVisible"
                title="账号信息"
                width="30%"
               
            >
                <el-form :model="addUser">
                  <el-form-item label="用户名:">
                    <el-input v-model="addUser.username" ></el-input>
                  </el-form-item>
                  <el-form-item label="密码:">
                    <el-input v-model="addUser.password" type="password" ></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码:">
                    <el-input v-model="addUser.confirmpassword" type="password" ></el-input>
                  </el-form-item>
                 
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                    
                    <el-button type="primary" @click="registerUser">
                    添加
                    </el-button>
                </span>
                </template>
            </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { Search,Delete ,Plus,Close,Check} from '@element-plus/icons-vue';
  
  import {reactive,ref,onMounted } from 'vue';
  import useStore from '@/store';
  const {Back} = useStore()
  const dialogVisible=ref(false)
  const pageIndex=ref(1)
  const Name=ref('')
  const Id=ref(null)
  const addUser=reactive({
    username:null,
    password:null,
    confirmpassword:null,
  })
  onMounted(()=>{
    Back.GetUser(),
    Back.GetLimitUser({"num":1,"pagesize":3})
  })
 
  const registerUser=()=>{
    const {username,password,confirmpassword} = addUser
    if(password===confirmpassword){
      Back.userRegist({"username":username,"pwd":password,"role":1})
      Back.GetUser(),
      Back.GetLimitUser({"num":pageIndex.value,"pagesize":3})
    }else{
      alert('您两次输入的密码不一致')
    }
   
  }
  const deleteUser=(username)=>{
    Back.DeleteUser({"username":username})
    Back.GetUser()
    Back.GetLimitUser({"num":pageIndex.value,"pagesize":3})
  }
  const DisableUser=(username)=>{
    Back.DisableUser({"username":username})
  }

  const RecoverUser=(username)=>{
    Back.RecoverUser({"username":username})
  }

  const handlePageChange=(currentpage)=>{
   if(Back.def==0){
    Back.GetLimitUser({"num":currentpage,"pagesize":3})
   }
  }
  const SearchName=()=>{
    if(Name.value!=''){
      Back.def=1
      Back.GetUserName({"username":Name.value})
    }
    else{
      pageIndex.value=1
      Back.def=0
      Back.GetUser(),
    Back.GetLimitUser({"num":1,"pagesize":3})
    }
  }

  const SearchId=()=>{
    if(Id.value!=''){
    Back.def=1
    Back.GetUserId({"id":Id.value})
    }
    else{
      pageIndex.value=1
      Back.def=0
      Back.GetUser(),
    Back.GetLimitUser({"num":1,"pagesize":3})
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