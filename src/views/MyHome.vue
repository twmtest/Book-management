<template>
  <MyHeader />
  <MySidebar />
  <div class="content-box" :class="{ 'content-collapse': collapse }" >
    <router-view ></router-view>
  </div>
</template>
<script setup>

// @ is an alias to /src
import MyHeader from '../components/MyHeader'
import MySidebar from '@/components/MySidebar';
import useStore from '@/store/index.js';
import {onMounted} from 'vue'
const {Circle} = useStore()
import { storeToRefs } from 'pinia';
const { Sidebar} = useStore()
 const {collapse}=storeToRefs(Sidebar)
 onMounted(()=>{
    Circle.GetAllCircle()
})
  
</script>

<style scoped>
.content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
}
.content-collapse {
    left: 65px;
}
</style>
