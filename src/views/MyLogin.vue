<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
						<template #prepend>
							<el-button :icon="User"></el-button>
						</template>
					</el-input>
        </el-form-item>
        <el-form-item prop="password">
					<el-input
						type="password"
						placeholder="password"
						v-model="param.pwd"
						@keyup.enter="userLogin"
					>
						<template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
        <div class="login-btn">
					<el-button type="primary" @click.prevent="userLogin">登录</el-button>
				</div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { Lock, User } from '@element-plus/icons-vue';
import { useRouter,useRoute } from 'vue-router';
import useStore from '@/store/index.js'
const { Login } = useStore()
const router = useRouter();
const route = useRoute()
const param=reactive({
	username:'',
	pwd:''
})
const  userLogin = async()=>{
  try{
	const {username,pwd}=param
	username && pwd && await Login.userLogin({"username":username,"pwd":pwd})//等真正接口再修改
	let toPath=route.query.redirect || '/addbook'
	router.push(toPath)
       
  }catch(error){
	
	alert(error.message)
  }
}
</script>

<style scoped>
.login-wrap {
	position: absolute;
	width: 100%;
	height: 100%;
	background-image: url(../assets/images/login-bg.jpg);
	background-size: 100%;
}
.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}
.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}
.ms-content {
	padding: 30px 30px;
}
.login-btn {
	text-align: center;
}
.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
}
</style>