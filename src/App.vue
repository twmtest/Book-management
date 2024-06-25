<template>
  <el-config-provider :locale="zhCn">
        <router-view v-if="isRouterAlive"/>
    </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {nextTick,provide,ref} from 'vue'
const isRouterAlive=ref(true)
const reload=()=>{
  
  isRouterAlive.value=false
  nextTick(()=>{
    isRouterAlive.value=true
  })
}
provide('reload',reload)
</script>

<style>
@import './assets/css/main.css';
</style>
