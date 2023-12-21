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
        },
        {
            path:'/scoreDetails',
            name:'score-scoreDetails',
            component:()=>import('@/views/Score/ScoreDetails.vue')
        },
        {
            path:'/showDetectionCourse',
            name:'detection-showDetectionCourse',
            component:()=>import('@/views/detection/ShowDetectionCourse.vue')
        },
        {
            path:'/showDetectionHomework',
            name:'detection-showDetectionHomework',
            component:()=>import('@/views/detection/ShowDetectionHomework.vue')
        },
        {
            path: '/detectionDetails',
            name: 'detection-detectionDetails',
            component: () => import('@/views/detection/DetectionDetails.vue')
        },
        {
            path:'/workPlatform',
            name:'home-workPlatform',
            component:()=>import('@/views/home/WorkPlatform.vue')
        },
        {
            path:'/gradesDetails',
            name:'grades-gradesDetails',
            component:()=>import('@/views/Score/GradesDetails.vue')
        },
        {
            path:'/myRecords',
            name:'myRecords',
            component:()=>import('@/views/Score/MyRecords.vue')
        },
        {
            path:'/appeal',
            name:'my-appeal',
            component:()=>import('@/views/appeal/Appeal.vue')
        },
        {
            path:'/addAppeal',
            name:'my-addAppeal',
            component:()=>import('@/views/appeal/AddAppeal.vue')
        },
        {
            path:'/unAnsweredAppeal',
            name:'teacher-unAnsweredAppeal',
            component:()=>import('@/views/appeal/UnAnsweredAppeal.vue')
        },
        {
            path:'/answeredAppeal',
            name:'teacher-answeredAppeal',
            component:()=>import('@/views/appeal/AnsweredAppeal.vue')
        },
        {
            path:'/teacherAppeal',
            name:'teacher-teacherAppeal',
            component:()=>import('@/views/appeal/TeacherAppeal.vue')
        },
        {
            path:'/teacherAnsweredAppeal',
            name:'teacher-teacherAnsweredAppeal',
            component:()=>import('@/views/appeal/TeacherAnsweredAppeal.vue')
        },
        {
            path:'/teacherUnAnsweredAppeal',
            name:'teacher-teacherUnAnsweredAppeal',
            component:()=>import('@/views/appeal/TeacherUnansweredAppeal.vue')
        },
        {
            path:'/teacherAddAnswerAppeal',
            name:'teacher-teacherAddAnswerAppeal',
            component:()=>import('@/views/appeal/TeacherAddAnswerAppeal.vue')
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
