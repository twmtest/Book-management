<template>
  <div class="sidebar">
    <el-row class="tac">
    
    <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
       
        :collapse="collapse"
        router
      >
       
        <el-menu-item index="addbook">
          <el-icon><icon-menu /></el-icon>
          <span>添加图书</span>
        </el-menu-item>
        <el-menu-item index="changebook">
          <el-icon><icon-menu /></el-icon>
          <span>修改图书</span>
        </el-menu-item>
        <el-menu-item index="managebook">
          <el-icon><icon-menu /></el-icon>
          <span>图书管理</span>
        </el-menu-item>
        <el-menu-item index="addtopic">
          <el-icon><icon-menu /></el-icon>
          <span>添加文章</span>
        </el-menu-item>
        <el-menu-item index="managetopic">
          <el-icon><icon-menu /></el-icon>
          <span>管理文章</span>
        </el-menu-item>
        <el-menu-item index="addnotice">
          <el-icon><icon-menu /></el-icon>
          <span>添加通知</span>
        </el-menu-item>
        <el-menu-item index="managefront">
          <el-icon><icon-menu /></el-icon>
          <span>前台人员管理</span>
        </el-menu-item>
        <el-menu-item index="manageback">
          <el-icon><icon-menu /></el-icon>
          <span>后台人员管理</span>
        </el-menu-item>
        <el-menu-item index="managecomment">
          <el-icon><icon-menu /></el-icon>
          <span>评论管理</span>
        </el-menu-item>
        <el-menu-item index="addcircle">
          <el-icon><icon-menu /></el-icon>
          <span>添加轮播图</span>
        </el-menu-item>
        <el-menu-item index="managecircle">
          <el-icon><icon-menu /></el-icon>
          <span>管理轮播图</span>
        </el-menu-item>
        <el-menu-item index="wordlist">
          <el-icon><icon-menu /></el-icon>
          <span>管理留言</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useStore from '@/store/index.js';
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
const { Sidebar } = useStore()
 const {collapse}=storeToRefs(Sidebar)

</script>

<style scoped>
.el-row{
    display: flex;
    height:100vh;
}
.el-menu{
    height: 100%;
}
.tac{
    width: 30%;
}
.sidebar > ul {
    height: 100%;
}
</style>