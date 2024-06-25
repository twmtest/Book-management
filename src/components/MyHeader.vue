<template>
  <div class="header">
	<div class="collapse-btn" @click="collapseChage">
			<el-icon v-if="Sidebar.collapse"><Expand /></el-icon>
			<el-icon v-else><Fold /></el-icon>
		</div>
	<div class="logo">后台管理系统</div>
	<div class="header-right">
		<div class="header-user-con">
			<el-avatar class="user-avator" :size="30" :src="imgurl" />
			<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{ username }}
						<el-icon class="el-icon--right">
							<ArrowDown />
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							
							<el-dropdown-item command="user">个人中心</el-dropdown-item>
							<el-dropdown-item divided command="loginout" >退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
		</div>
		
	</div>
  </div>
</template>

<script setup>
import useStore from '@/store/index.js';
const { Sidebar,Login } = useStore()
import imgurl from '../assets/images/img.jpg';
import { useRouter } from 'vue-router';
const username = Login.userInfo.username;
const router = useRouter();
const handleCommand = (command) => {
	if (command == 'loginout') {
		logOut()
		router.push('/login');
	} else if (command == 'user') {
		router.push('/user');
	}
};
const collapseChage = () => {
	Sidebar.handleCollapse();
};
const logOut=async()=>{
	try{
		await Login.userLogOut()
		router.push('/login')
	}catch(error){
		alert(error.message)
	}
}
</script>

<style scoped>
.header{
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 70px;
	font-size: 22px;
	color: #fff;
	background-color: #242f42;
}
.collapse-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	float: left;
	padding: 0 21px;
	cursor: pointer;
}
.header .logo {
	float: left;
	width: 250px;
	line-height: 70px;
}
.header-right {
	float: right;
	padding-right: 50px;
}
.header-user-con {
	display: flex;
	height: 70px;
	align-items: center;
}
</style>