import {useSidebarStore} from './sidebar.js'
import {useLoginStore} from './login.js'
import { backUserStore } from './backuser.js'
import { bookListStore } from './booklist.js'
import { commentListStore } from './commentlist.js'
import { frontUserStore } from './frontuser.js'
import {TopicStore} from './addtopic.js'
import {NewsStore} from './updatenews.js'
import {useCircleStore} from './circle.js'
import {useWordStore} from './word.js'
const useStore=()=>{
    return{
        Sidebar:useSidebarStore(),
        Login:useLoginStore(),
        Back:backUserStore (),
        Book:bookListStore(),
        Comment:commentListStore(),
        Front:frontUserStore(),
        Topic:TopicStore(),
        News:NewsStore(),
        Circle:useCircleStore(),
        Word:useWordStore()
    }
}

export default useStore