 <template>
    <div class="container">
        <div class="handle-box">
            <el-input  placeholder="用户名称" class="handle-input mr10" v-model="Name"></el-input>
				<el-button type="primary" :icon="Search" @click="SearchName" >搜索</el-button>
        <el-input  placeholder="用户ID" class="handle-input mr10" v-model="Id"></el-input>
				<el-button type="primary" :icon="Search" @click="SearchId" >搜索</el-button>
        </div>
        <el-table :data="Front.limitUserInfo"  border style="width: 100%"  :row-class-name="tableRowClassName">
            <el-table-column prop="id" label="id" width="150"  align="center"/>
            <el-table-column prop="username" label="用户名" width="150" align="center"/>
            <el-table-column  label="操作" width="660" align="center" >
            <template #default="scope" >          
						<el-button text  :icon="Delete" class="red"  @click="deleteUser(scope.row.username)" >
							删除账号
						</el-button>
            <el-button text  :icon="Close" class="red"   @click="DisableUser(scope.row.username)">
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
          :total="Front.frontUserInfo.length" 
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
  import {  Search,Delete,Close,Check } from '@element-plus/icons-vue';
  import {onMounted,ref} from 'vue'
  import useStore from '@/store';
  onMounted(()=>{
    Front.GetUser(),
    Front.GetLimitUser({"num":1,"pagesize":5})
  })
  const Name=ref('')
  const Id=ref(null)
  const {Front} = useStore()
  const pageIndex=ref(1)

  const tableRowClassName = ({
  row,
  rowIndex,
    }) => {
      if (rowIndex===1) {
        console.log("rowIndex为1");
        console.log(row);
        return 'warning-row'
      } 
      return ''
}
  
  const deleteUser=(username)=>{
    Front.DeleteUser({"username":username})
    Front.GetUser()
    Front.GetLimitUser({"num":pageIndex.value,"pagesize":5})
  }
  const DisableUser=(username)=>{
    Front.DisableUser({"username":username})
  }

  const RecoverUser=(username)=>{
    Front.RecoverUser({"username":username})
  }
  const handlePageChange=(currentpage)=>{
    if(Front.def==0){
    Front.GetLimitUser({"num":currentpage,"pagesize":5})
    }
    
  }
  const SearchName=()=>{
    if(Name.value!=''){
      Front.def=1
      Front.GetUserName({"username":Name.value})
    }
    else{
      pageIndex.value=1
      Front.def=0
      Front.GetUser(),
      Front.GetLimitUser({"num":1,"pagesize":5})
    }
  }

  const SearchId=()=>{
    if(Id.value!=''){
      Front.def=1
    Front.GetUserId({"id":Id.value})
    }
    else{
      pageIndex.value=1
      Front.def=0
      Front.GetUser(),
      Front.GetLimitUser({"num":1,"pagesize":5})
    }
  }
  </script>
  
  <style scoped>
 .el-table .warning-row {
  --el-table-tr-bg-color: red;
}

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
 