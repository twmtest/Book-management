<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="10">
				<el-card shadow="hover">
					<template #header>
						<div class="clearfix">
							<span>基础信息</span>
						</div>
					</template>
					<div class="info">
						<div class="info-image" >
							<el-avatar :size="100" :src="avatarImg" />
							<span class="info-edit">
								<i class="el-icon-lx-camerafill"></i>
							</span>
						</div>
						<div class="info-name">{{ name }}</div>
						
					</div>
				</el-card>
			</el-col>
			<el-col :span="14">
				<el-card shadow="hover">
					<template #header>
						<div class="clearfix">
							<span>账户编辑</span>
						</div>
					</template>
					<el-form label-width="100px">
						<el-form-item label="用户名："> {{ name }} </el-form-item>
						<el-form-item label="新密码：">
							<el-input type="password" v-model="form.new"></el-input>
						</el-form-item>
						<el-form-item label="确认新密码：">
							<el-input type="password" v-model="form.confirmnew"></el-input>
						</el-form-item>
						
						<el-form-item>
							<el-button type="primary" @click="onSubmit">保存</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		
	</div>
</template>

<script setup  name="user">
import { reactive} from 'vue';
import avatarImg from '../assets/images/img.jpg';
import useStore from '@/store';
const {Login} = useStore()
const name = Login.userInfo.username;
const form = reactive({
	old: '',
	new: '',
	confirmnew:''
});
const onSubmit = () => {};







</script>

<style scoped>
.info {
	text-align: center;
	padding: 35px 0;
}
.info-image {
	position: relative;
	margin: auto;
	width: 100px;
	height: 100px;
	background: #f8f8f8;
	border: 1px solid #eee;
	border-radius: 50px;
	overflow: hidden;
}

.info-edit {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	opacity: 0;
	transition: opacity 0.3s ease;
}
.info-edit i {
	color: #eee;
	font-size: 25px;
}
.info-image:hover .info-edit {
	opacity: 1;
}
.info-name {
	margin: 15px 0 10px;
	font-size: 24px;
	font-weight: 500;
	color: #262626;
}
.crop-demo-btn {
	position: relative;
}
.crop-input {
	position: absolute;
	width: 100px;
	height: 40px;
	left: 0;
	top: 0;
	opacity: 0;
	cursor: pointer;
}
</style>
