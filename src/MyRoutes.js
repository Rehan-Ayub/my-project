import { createWebHistory,createRouter } from "vue-router";
import ToDoListBox from "./components/sub components/toDoListBox.vue";
import SeeTask from "./components/seeTask.vue";
import NewTask from "./components/NewTask.vue";

const routes=[
    {
        name:'home',
        component:ToDoListBox,
        path:'/'
    },
   
    {
        name:'SeeTask',
        component:SeeTask,
        path:'/SeeTask/:id'
    },
    {
        name:'Newtask',
        component:NewTask,
        path:'/NewTask'
    }
];
const router=createRouter({
    history:createWebHistory(),
    routes,
});

export default router;