import { createRouter, createWebHistory } from 'vue-router'
import MyHome from '../views/MyHome.vue'
import useStore from '@/store'
import {removeToken,getToken} from '@/utils/token'
const routes = [
  {
    path: '/',
    redirect: '/addbook',
  },
  {
    path: '/',
    name: 'home',
    component:MyHome,
    children:[
      {
        path:'/addbook',
        name:'addbook',
        component:()=>import(/* webpackChunkName: "addbook" */ '../views/AddBook.vue')
      },
      {
        path:'/addnotice',
        name:'addnotice',
        component:()=>import(/* webpackChunkName: "addnotice" */ '../views/AddNotice.vue')
      },
      {
        path:'/addtopic',
        name:'addtopic',
        component:()=>import(/* webpackChunkName: "addtopic" */ '../views/AddTopic.vue')
      },
      {
        path:'/manageback',
        name:'manageback',
        component:()=>import(/* webpackChunkName: "manageback" */ '../views/ManageBack.vue')
      },
      {
        path:'/managebook',
        name:'managebook',
        component:()=>import(/* webpackChunkName: "managebook" */ '../views/ManageBook.vue')
      },
      {
        path:'/managecomment',
        name:'managecomment',
        component:()=>import(/* webpackChunkName: "managecomment" */ '../views/ManageComment.vue')
      },
      {
        path:'/managefront',
        name:'managefront',
        component:()=>import(/* webpackChunkName: "managefront" */ '../views/ManageFront.vue')
      },
      {
        path:'/user',
        name:'user',
        component:()=>import(/* webpackChunkName: "user" */ '../views/MyUser.vue')
      },
      {
        path:'/changebook',
        name:'changebook',
        component:()=>import(/* webpackChunkName: "changebook" */ '../views/ChangeBook.vue')
      },
      {
        path:'/managetopic',
        name:'managetopic',
        component:()=>import(/* webpackChunkName: "managetopic" */ '../views/ManageTopic.vue')
      },
      {
        path:'/addcircle',
        name:'addcircle',
        component:()=>import(/* webpackChunkName: "addcircle" */ '../views/AddCircle.vue')
      },
      {
        path:'/managecircle',
        name:'managecircle',
        component:()=>import(/* webpackChunkName: "managecircle" */ '../views/ManageCircle.vue')
      },
      {
        path:'/wordlist',
        name:'wordlist',
        component:()=>import(/* webpackChunkName: "wordlist" */ '../views/ManageWord.vue')
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import(/* webpackChunkName: "login" */ '../views/MyLogin.vue')
  },
  {
    path:'/showtopic/:content',
    name:'showtopic',
    component:()=>import(/* webpackChunkName: "showtopic" */ '../views/ShowTopic.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async (to, from, next) => {
const {Login} = useStore()
let token=Login.token;
let name=Login.userInfo.username
if(token){
  if(to.path=="/login"){
    next('/');
  }else{
    if(name){
      next()
    }else{
      try{
        await Login.getOwner({"username":getToken()})
        next()
      }catch(err){
        Login.token=null
        removeToken()
        next('/login')
        alert('登录时间过长，请重新登录')
      }
    }
  }
}else{
  let toPath = to.path;
  if(toPath.indexOf('/user')!=-1
  ||toPath.indexOf('/addbook')!=-1
  ||toPath.indexOf('/addnotice')!=-1
  ||toPath.indexOf('/addtopic')!=-1
  ||toPath.indexOf('/manageback')!=-1
  ||toPath.indexOf('/managebook')!=-1
  ||toPath.indexOf('/managecomment')!=-1
  ||toPath.indexOf('/managefront')!=-1
  ||toPath.indexOf('/managebook')!=-1){
    next('/login?redirect='+toPath);
  }else{
    next();
  }
}
});
export default router
