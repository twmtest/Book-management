<template>
    <div class="container">
      
          <div class="handle-box">
              
          <el-table :data="Circle.circleList"  border style="width: 100%" >
              <el-table-column prop=id label="ID" width="150"  align="center"/>
              <el-table-column  label="图片" width="150" align="center" >
                  <template #default="scope">
                    <el-image
                            class="table-td-thumb"
                            :src="scope.row.img"
                            :z-index="10"
                            :preview-src-list="[scope.row.img]"
                            preview-teleported
                    >
                    </el-image>
                    
                  </template>
            </el-table-column>
              <el-table-column  label="操作" width="220" align="center">
              <template #default="scope">          
                          <el-button text  :icon="Delete" class="red"  @click="DeleteCircle(scope.row.id)">
                              删除轮播图
                          </el-button>
             
            </template> 
              </el-table-column>
             
          </el-table>
         
             
      </div>
      </div>
  </template>
  
  <script setup>
  import { Delete} from '@element-plus/icons-vue';
 import { onMounted } from 'vue';
  import useStore from '@/store';
  onMounted(()=>{
    Circle.GetAllCircle()
  })
  const {Circle} = useStore()
 const DeleteCircle=(id)=>{
    Circle.DeleteCircle({"id":id})
    Circle.GetAllCircle()
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