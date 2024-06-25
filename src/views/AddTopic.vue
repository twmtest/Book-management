<template>
   <el-form>
      <el-form-item label="标题"><el-input v-model="title" placeholder="请输入标题"></el-input></el-form-item>
      <el-form-item label="标签">
        <el-select v-model="label" class="m-2" placeholder="请选择标签" value-key="id">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.label"
      :value="item.value"
      
    />
    
  </el-select>
      </el-form-item>
    </el-form> 
    
  <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
      <el-button type="primary" @click="sumbit" >提交</el-button>
    </div>
  </template>
  
  <script setup>
    
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { onBeforeUnmount, ref, shallowRef,onMounted} from 'vue'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import { getToken } from '@/utils/token';
    import useStore from '@/store';
    const {Topic} = useStore()
    const label=ref(null)
    const title=ref(null)
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref(null)

    const mode= ref('default')

    const toolbarConfig = {}
    const editorConfig = { 
      MENU_CONF: {},
      placeholder: '请输入内容...'
     }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    editorConfig.MENU_CONF['uploadImage'] = {
     server: '/api/essay/addimg',
     fieldName:'imageFile',
     allowedFileTypes: ['image/*'],
     maxFileSize: 1 * 1024 * 1024,
     timeout: 100 * 1000,
     customInsert(res, insertFn) {                  // JS 语法
        // // res 即服务端的返回结果

        // // 从 res 中找到 url alt href ，然后插入图片
        insertFn('https://7888k0724y.zicp.fun'+res.data.url)
        
    },

    onSuccess(file, res) {          
        console.log(`${file.name} 上传成功`, res)
    },
    onFailed(file, res) {           
        console.log(`${file.name} 上传失败`, res)
    },
    onError(file, err, res) {               
        console.log(`${file.name} 上传出错`, err, res)
    },
    }
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    const sumbit=()=>{
      if(title.value!=''&&valueHtml.value!=''){
      Topic.AddTopic({"title":title.value,"content":valueHtml.value,"label":label.value})
      }else{
        alert('标题或内容不能为空')
      }
     
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
</script>
  
  <style scoped>
  .el-upload{
    margin-bottom: 100px;
  }
  </style>