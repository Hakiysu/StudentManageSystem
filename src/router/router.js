import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("../components/login/login.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../components/register/register.vue")
    },
    {
        path: "/",
        name: "home",
        component: () => import("../manage/home/home.vue")
    },
    {
        path: "/studentManager",
        name: "studentManager",
        component: () => import("../manage/studentManager/studentManager.vue")
    },
    {
        path: "/studentAdder",
        name: "studentAdder",
        component: () => import("../manage/studentAdder/studentAdder.vue")
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;