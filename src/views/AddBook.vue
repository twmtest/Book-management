
  <template>
    <el-form>
      <el-form-item label="书名"><el-input v-model="bookname" placeholder="请输入书名"></el-input></el-form-item>
      <el-form-item label="作者"><el-input v-model="bookAuther" placeholder="请输入作者"></el-input></el-form-item>
      <el-form-item label="书的介绍"><el-input v-model="bookIntroduce" placeholder="请输入介绍"></el-input></el-form-item>
      
    </el-form>

    
  <el-upload
    class="upload-demo"
    drag
    action=""
    :before-upload = "beforeBookUpload"
    :http-request="bookupload"
    
    > 
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      将文件拖拽此处或 <em>点击上传</em>
    </div>
  </el-upload>
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
  <el-button type="primary" @click="upload">上传</el-button>
</template>


<script setup>
import { ref} from 'vue'
import axios from 'axios';
const bookname=ref('')
const bookAuther=ref('')
const bookIntroduce=ref('')
let formData = new FormData()

const bookupload=(param)=>{
  let book=bookname.value
  let Auther=bookAuther.value
  let Introduce=bookIntroduce.value
  formData.append('file', param.file)
  formData.append('bookName',book)
  formData.append('bookAuther',Auther)
  formData.append('bookIntroduce',Introduce) 
}
const photoupload=(param)=>{
  formData.append('imageFile', param.file)
}
const upload=()=>{
  axios({
    method:'post',
    url:'/api/book/addbook',
    data:formData,
  }).then(res=>{
    alert('上传书籍成功')
    console.log(res)
  }).catch(err=>{
    alert('上传失败，请重新上传')
    console.log(err)
  })
  formData.delete('file')
  formData.delete('bookName')
  formData.delete('bookAuther')
  formData.delete('bookIntroduce')
  formData.delete('imageFile')
  
}
const beforeBookUpload=(file)=>{
  
  const isEpub=file.type==='application/epub';
  const isPdf=file.type==='application/pdf';
  const BookSize = file.size / 1024 / 1024 < 10;  
  const isBook=(isEpub||isPdf);
  if(!isBook){
   alert('上传文件只能是 EPUB 或 PDF 格式!');
  }
  if (!BookSize) {
    alert('上传文件大小不能超过 10MB!');
  }
  return isBook && BookSize
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

</script>

<style scoped>

</style>