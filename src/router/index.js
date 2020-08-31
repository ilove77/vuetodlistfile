import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 在VUE中路由遇到Error: Avoided redundant navigation to current location:報錯顯示是路由重複，
// 雖然對項目無影響，但是看到有紅的還是不舒服。
// 於是查了一下發現可以這樣解決
// 在你引入VueRouter的時候再加上一句話：
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [

  {
    path: '/Home', name: 'Home', component: () => import("../components/Home"),
    children:[
    {path:'/Main', name:'Main',component:() => import('../components/vmain')
    }]
  },

  { path: '/Login', name: 'Login', component: () => import("../components/Login") },

  { path: '/', redirect: { name: 'Login' } },
  { path: '/Register', name: 'Register', component: () => import("../components/Register") },
  { path: '/Helloworld', name: 'Helloworld', component: () => import("../components/HelloWord") },
  { path: '/Thing', name: 'Thing', component: () => import("../components/Thing") },
  { path: '/Welcome', name: 'Welcome', component: () => import("../components/Welcome"),
children:[{path:'/Testsd',name:'TESTTT',component:() => import('../components/test') } ]},
{path:'/Test',name:'TEST',component:() => import('../components/test2') },
{path:'/transition',name:"transition",component:() => import('../components/transition')}]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
