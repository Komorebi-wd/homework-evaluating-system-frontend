import { createRouter, createWebHistory } from 'vue-router'
import { unauthorized } from "@/net";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: () => import('@/views/WelcomeView.vue'),
            children: [
                {
                    path: '',
                    name: 'welcome-login',
                    component: () => import('@/views/welcome/LoginPage.vue')
                }, {
                    path: 'register',
                    name: 'welcome-register',
                    component: () => import('@/views/welcome/RegisterPage.vue')
                }, {
                    path: 'forget',
                    name: 'welcome-forget',
                    component: () => import('@/views/welcome/ForgetPage.vue')
                }
            ]
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('@/views/IndexView.vue'),
        },
        {
            path: '/home',
            name: 'welcome-home',
            component: () => import('@/views/home/HomePage.vue')
         },
        {
            path: '/course',
            name: 'course-platform',
            component: () => import('@/views/home/CoursePage.vue')
        },
        {
            path: '/work',
            name: 'home-work',
            component: () => import('@/views/home/WorkPage.vue')
        },
        {
            path: '/evaluateHomework',
            name: 'evaluate-evaluateHomework',
            component: () => import('@/views/evaluate/EvaluateHomework.vue')
        },
        {
            path: '/evaluate',
            name: 'evaluate-evaluate',
            component: () => import('@/views/evaluate/Evaluate.vue')
        },
        {
            path:'/submitStuHomework',
            name:'submit-submitStuHomework',
            component:()=>import('@/views/submit/SubmitStuHomework.vue')
        },
        {
            path:'/workFromCourse',
            name:'home-workFromCourse',
            component:()=>import('@/views/home/WorkFromCourse.vue')
        }
    ]

})

// router.beforeEach((to, from, next) => {
//     const isUnauthorized = unauthorized()
//     if(to.name.startsWith('welcome') && !isUnauthorized) {
//         next('/index')
//     } else if(to.fullPath.startsWith('/index') && isUnauthorized) {
//         next('/')
//     } else {
//         next()
//     }
// }
// )


export default router
