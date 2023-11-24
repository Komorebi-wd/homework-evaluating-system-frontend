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
        },
        {
            path:'/workManage',
            name:'teacher-workManage',
            component:()=>import('@/views/teacher/WorkManagePage.vue')
        },
        {
            path:'/teachCourse',
            name:'teacher-teachCourse',
            component:()=>import('@/views/teacher/TeachCoursePage.vue')
        },
        {
            path:'/evaluatePlatform',
            name:'evaluatePlatform',
            component:()=>import('@/views/evaluate/EvaluatePlatformPage.vue')
        },
        {
            path:'/evaluateRecords',
            name:'evaluateRecords',
            component:()=>import('@/views/evaluate/EvaluateRecordsPage.vue')
        },
        {
            path:'/markFromCourse',
            name:'markFromCourse',
            component:()=>import('@/views/evaluate/MarkFromCoursePage.vue')
        },
        {
            path:'/markFromHomework',
            name:'markFromHomework',
            component:()=>import('@/views/evaluate/MarkFromHomework.vue')
        },
        {
            path:'/mark',
            name:'mark',
            component:()=>import('@/views/evaluate/MarkPage.vue')
        },
        {
            path:'/allClass',
            name:'allClass',
            component:()=>import('@/views/class/AllClassPage.vue')
        },
        {
            path:'/showHWScore',
            name:'score-showHWScore',
            component:()=>import('@/views/Score/ShowHWScore.vue')
        },
        {
            path:'/showCourse',
            name:'score-showCourse',
            component:()=>import('@/views/Score/ShowCourse.vue')
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
