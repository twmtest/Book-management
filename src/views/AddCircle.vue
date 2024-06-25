
<template>
   

    
 
  <el-upload
    class="upload-demo"
    drag
    action=""
    multiple
    :before-upload = "beforeimgUpload"
    :http-request="photoupload"
    > 
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      将图片拖拽此处或 <em>点击上传</em>
    </div>
  </el-upload>
  <el-tooltip  :content="ifDisabled?'当前轮播图超过上限':''">
  <div style="margin: 0 10px">
    <el-button type="primary" @click="upload" :disabled="ifDisabled">上传</el-button>
  </div>
  </el-tooltip>
</template>


<script setup>
import axios from 'axios';
import {onMounted,ref} from 'vue'
import useStore from '@/store';
const {Circle} = useStore()
let ifDisabled = ref(false)
let formData = new FormData()
onMounted(()=>{
    if(Circle.circleList.length>7){
        
        ifDisabled.value=true
    }
   
})

const photoupload=(param)=>{
  formData.append('imageFile', param.file)
}
const upload=()=>{
  axios({
    method:'post',
    url:'/api/circle/add',
    
    data:formData,
  }).then(res=>{
    alert('上传轮播图成功')
    console.log(res)
  }).catch(err=>{
    alert('上传失败，请重新上传')
    console.log(err)
  })
 
  formData.delete('imageFile')
  Circle.GetAllCircle()
  if(Circle.circleList.length>7){
        ifDisabled.value=true
    }
}

const beforeimgUpload=(file)=>{
  formData.append('imageFile',file)
  const isjpg=file.type==='image/jpeg';
  const ispng=file.type==='image/png';
  const photoSize = file.size / 1024 / 1024 < 2;  
  const isphoto=(isjpg||ispng);
  let isSize = true;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (theFile) => {
        const image = new Image();
        image.src = theFile.target.result;
        image.onload = () => {
          const { width, height } = image;
          if(width/height>1.78||width/height<1.5) {
            alert("请上传比例为16：9和3：2之间的图片！");
            isSize = false;
          }
        };
      };

  if(!isphoto){
   alert('上传文件只能是 jpg 或 png 格式!');
  }
  if (!photoSize) {
    alert('上传文件大小不能超过 2MB!');
  }
  return isphoto && photoSize && isSize
}

</script>

<style scoped>

</style>