
<template>
  <div class="container">
    <el-form>
      <el-form-item label="书名"><el-input v-model="bookname" placeholder="请输入书名"></el-input></el-form-item>
      <el-form-item label="作者"><el-input v-model="bookAuther" placeholder="请输入作者"></el-input></el-form-item>
      <el-form-item label="书的介绍"><el-input v-model="bookIntroduce" placeholder="请输入介绍"></el-input></el-form-item>
      <el-form-item label="id"><el-input v-model="bookid" placeholder="请输入书的id"></el-input></el-form-item>
    </el-form>

    

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
  <el-button type="primary" @click="upload">修改图书</el-button>

  <div class="label">
    <el-select v-model="label" class="m-2" placeholder="请选择标签" value-key="id">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.label"
      :value="item.value"
      
    />
    
  </el-select>
  <el-input v-model="authorid" placeholder="请输入书籍id">书籍id</el-input>
  <el-button type="primary" @click="uploadlabel">修改标签</el-button>
  </div>
</div>
</template>


<script setup>

import { ref} from 'vue'
import axios from 'axios';
import useStore from '@/store';
const {Book} = useStore()
const bookname=ref('')
const bookAuther=ref('')
const bookIntroduce=ref('')
const bookid=ref(null)
const authorid=ref(null)
let formData = new FormData()
const label=ref(null)

const photoupload=(param)=>{
  let book=bookname.value
  let Auther=bookAuther.value
  let Introduce=bookIntroduce.value
  let id=bookid.value
  formData.append('bookName',book)
  formData.append('bookAuther',Auther)
  formData.append('bookIntroduce',Introduce) 
  formData.append('imageFile', param.file)
  formData.append('bookid', id)
}
const upload=()=>{
  axios({
    method:'post',
    url:'/api/book/updatebook',
    
    data:formData,
  }).then(res=>{
    alert('修改成功')
    console.log(res)
  }).catch(err=>{
    alert('上传失败，请重新上传')
    console.log(err)
  })
 
  formData.delete('bookName')
  formData.delete('bookAuther')
  formData.delete('bookIntroduce')
  formData.delete('imageFile')
  formData.delete('bookid')
}

const beforeimgUpload=(file)=>{
  formData.append('imageFile',file)
  const isjpg=file.type==='image/jpeg';
  const ispng=file.type==='image/png';
  const photoSize = file.size / 1024 / 1024 < 2;  
  const isphoto=(isjpg||ispng);
  if(!isphoto){
   alert('上传文件只能是 jpg 或 png 格式!');
  }
  if (!photoSize) {
    alert('上传文件大小不能超过 2MB!');
  }
  return isphoto && photoSize
}
const options = [
  { id:0,
    value: '0',
    label: '马克思列宁主义',
  },
  { id:1,
    value: '1',
    label: '毛泽东思想',
  },
  { id:2,
    value: '2',
    label: '邓小平理论',
  },
  { id:3,
    value: '3',
    label: '"三个代表"重要思想',
  },
  { id:4,
    value: '4',
    label: '科学发展观',
  },
  { id:5,
    value: '5',
    label: '习近平新时代中国特色社会主义思想',
  }
]
const uploadlabel=()=>{
  Book.ChangeLabel({"bookLabel":label.value,"bookid":authorid.value})
}
</script>

<style scoped>
.container {
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.label{
  padding-top: 30px;
  display: block;
}
.label>.el-input{
  width: 200px;
}
</style>