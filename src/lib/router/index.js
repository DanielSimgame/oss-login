import { createRouter, createWebHistory } from 'vue-router'
import UserStorages from '../Storages/UserStorages'
import {store} from '../store'
// 基础页面不使用按需加载
import Login from '../../users/Login.vue'
import NotFound from '../../pages/[...404].vue'

const Register = () => import('../../users/Register.vue')

const whiteList = ['/login', '/register', '/404'] // 未登录不重定向白名单
const redirectList = ['/login', '/register'] // 已登录重定向名单

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
    {
        path: '/',
        component: Login,
        meta: {
            title: 'SSO单点登录',
        },
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: {
            title: '注册',
        }
    },
    {
        name: 'notFound',
        path: '/404',
        meta: {
            title: '404 页面不存在',
        },
        component: NotFound,
    },
    {
        path: '/:path(.*)',
        // redirect: '/404',
        component: NotFound,
        meta: {
            title: '404 页面不存在',
        }
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

/**
 * @function titleHandler
 * @description 路由与网页标题处理
 * @param {any} to 路由对象
 * */
 const titleHandler = (to) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} - ${store.state.appData.title}`
    } else {
        document.title = `${store.state.appData.title}`  //没有就默认
    }
}

// 路由守卫
router.beforeEach(async (to, from, next) => {
    // nprogress.start()
    // 检查用户角色
    // const token = UserStorages.getToken()
    const requiredRoles = to.meta.roles
    // let currentRole = store.getters.getUserRole
    // let currentRole = token ? 'user' : ''

    // store.commit('resetDialogsState')

    // 后端未开放时直接next不做鉴权，便于开发。
    next()
    titleHandler(to)

    // 后端正常运作时需要进行鉴权。
    // if (currentRole === '' && whiteList.indexOf(to.path) === -1) {
    //     // 用户未登录，且页面不在 不重定向白名单 中，重定向到登录页
    //     titleHandler(to)
    //     next('/login')
    // } else if (to.matched.length === 0) {
    //     // 用户已登录，路由不存在无法跳转，重定向到404页面
    //     titleHandler(to)
    //     next('/404')
    // }


    // else if ((currentRole === 'admin' || 'user') && requiredRoles && requiredRoles.indexOf(currentRole) === -1) {
    //     // 用户已登录，路由存在但无权限无法跳转，向后端请求查询用户身份再进行判断
    //     if (!token) {
    //         titleHandler(to)
    //         next('/login')
    //     } else {
    //         await AccountApi.getUserInfo(token)
    //             .then(res => {
    //                 res.role === 1 ? currentRole = 'admin' : currentRole = 'user'
    //                 if (requiredRoles.indexOf(currentRole) !== -1) {
    //                     titleHandler(to)
    //                     next()
    //                 } else {
    //                     titleHandler(to)
    //                     next('/403')
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log('router err', err)
    //                 titleHandler(to)
    //                 next('/403')
    //             })
    //     }
    // }


    // else if (currentRole !== '' && redirectList.indexOf(to.path) !== -1) {
    //     // 用户已登录，不允许访问登录页和注册页
    //     titleHandler(to)
    //     next('/')
    // } else {
    //     // 用户已登录，正常访问网
    //     titleHandler(to)
    //     next()
    // }

})

router.afterEach(() => {
    // nprogress.done()
})
