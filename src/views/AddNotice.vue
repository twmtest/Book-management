<template>
    <div style="border: 1px solid #ccc;margin: 20px;">
      <el-input
          v-model="textarea"
          :rows="20"
          maxlength="500"
          show-word-limit
          type="textarea"
          placeholder="请输入通知内容"
        />
      <el-button type="primary" @click="submit" style="margin-top: 20px;">提交</el-button>
    </div>
  </template>
  
  <script setup>
   import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { onBeforeUnmount, ref, shallowRef} from 'vue'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import useStore from '@/store';
    const {News} = useStore()
    

    const textarea=ref('')

    
    const submit=()=>{
      News.UpdateNews({"content":textarea.value})
    }
  </script>
  
  <style>
  
  </style>