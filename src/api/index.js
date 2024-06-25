import requests from "./request";
//登录
export const reqUserLogin=(data)=>requests({url:`/user/login`,data,method:'post'})
//退出登录
export const reqLogOut=()=>requests({url:'/user/logout',method:'post'})
//注册
export const reqRegister=(data)=>requests({url:'/user/register',data,method:'post'})
//获取所有用户信息
export const reqGetUser=()=>requests({url:'/user/getlist',method:'get'})
//删除用户
export const reqDeleteUser=(data)=>requests({url:'/user/deluser',data,method:'post'})
//禁用用户
export const reqDisableUser=(data)=>requests({url:'/user/disuser',data,method:'post'})
//启用用户 
export const reqRecoverUser=(data)=>requests({url:'/user/okuser',data,method:'post'})
//添加书籍
export const reqAddBook=(data)=>requests({url:'/book/addbook',data,method:'post'})
//获取评论
export const reqGetAllComment=()=>requests({url:'/comment/getlist',method:'get'})
//获取书籍列表
export const reqGetAllBook=()=>requests({url:'/book/getlist',method:'get'})
//根据评论id获取评论
export const reqGetCommentId=(data)=>requests({url:'/comment/Bycommentid',data,method:'post'})
//根据用户id获取评论
export const reqGetUserId=(data)=>requests({url:'/comment/Byuserid',data,method:'post'})
//根据书籍id获取评论
export const reqGetBookId=(data)=>requests({url:'/comment/Bybookid',data,method:'post'})
//根据书籍名称获取书籍
export const reqByNameGetBook=(data)=>requests({url:'/book/bookByname',data,method:'post'})
//根据书籍id获取书籍
export const reqByIdGetBook=(data)=>requests({url:'/book/bookByid',data,method:'post'})
//根据评论id删除评论
export const reqDeleteComment=(data)=>requests({url:'/comment/delcomment',data,method:'post'})
//分页查找用户
export const reqGetLimit=(data)=>requests({url:'/user/Limit',data,method:'post'})
//添加文章
export const reqAddTopic=(data)=>requests({url:'/essay/addessy',data,method:'post'})
//更新通知
export const reqUpdateNews=(data)=>requests({url:'/news/upatenews',data,method:'post'})
//获取登录用户信息
export const reqGetOwner=(data)=>requests({url:'/user/token',data,method:'post'})
//删除书籍
export const reqDeleteBook=(data)=>requests({url:'/book/delbook',data,method:'post'})
//禁用书籍
export const reqDisableBook=(data)=>requests({url:'/book/disbook',data,method:'post'})
//启用书籍
export const reqRecoverBook=(data)=>requests({url:'/book/okbook',data,method:'post'})
//分页获取书籍
export const reqGetLimitBook=(data)=>requests({url:'/book/getlimit',data,method:'post'})
//获取全部文章
export const reqGetAllTopic=()=>requests({url:'/essay/getlist',method:'get'})
//分页获取文章
export const reqGetLimitTopic=(data)=>requests({url:'/essay/getlimit',data,method:'post'})
//删除文章
export const reqDeleteTopic=(data)=>requests({url:'/essay/delEssay',data,method:'post'})
//下架文章
export const reqDisableTopic=(data)=>requests({url:'/essay/disEssay',data,method:'post'})
//上架文章
export const reqRecoverTopic=(data)=>requests({url:'/essay/okEssay',data,method:'post'})
//根据标题查找文章
export const reqByNameTopic=(data)=>requests({url:'/essay/essayByname',data,method:'post'})
//根据id查找文章
export const reqByIdTopic=(data)=>requests({url:'/essay/essayByid',data,method:'post'})
//修改图书标签
export const reqChangeLabel=(data)=>requests({url:'/book/updatebookLabel',data,method:'post'})
//获取所有轮播图
export const reqGetAllCircle=()=>requests({url:'/circle/getlist',method:'get'})
//删除轮播图
export const reqDeleteCircle=(data)=>requests({url:'/circle/delet',data,method:'post'})
//分页获取评论
export const reqGetLimitComment=(data)=>requests({url:'/comment/getlimitbook',data,method:'post'})
//根据用户名查找
export const reqSearchUserName=(data)=>requests({url:'/user/userByname',data,method:'post'})
//根据用户id查找
export const reqSearchUserId=(data)=>requests({url:'/user/userByid',data,method:'post'})
//获取留言
export const reqGetAllWord=()=>requests({url:'/word/getlist',method:'get'})
//分页获取留言
export const reqGetLimitWord=(data)=>requests({url:'/word/getall',data,method:'post'})
//根据用户id查找留言
export const reqByUserGetWord=(data)=>requests({url:'/word/getuserid',data,method:'post'})
//根据留言id查找留言
export const reqByIdGetWord=(data)=>requests({url:'/word/getwordid',data,method:'post'})
//根据留言Id删除留言
export const reqDeleteWord=(data)=>requests({url:'/word/delbyid',data,method:'post'})
//查询留言用户id总数
export const reqAllWordUserId=(data)=>requests({url:'/word/getuseridnum',data,method:'post'})