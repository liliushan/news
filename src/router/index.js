import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let home = () => import('views/home/home')
let cart = () => import('views/cart/cart')
let mime = () => import('views/mime/mime')
let newslist = () => import('views/home/newslist')
let newsdetail = () => import('views/home/newsdetail')
let imglist = () => import('views/home/imglist')
let imgdetail = () => import('views/home/imgdetail')
let shoplist = () => import('views/home/shoplist')
let shopdetail = () => import('views/home/shopdetail')
let shopdesc = () =>import('views/home/shopdesc')
let shopcomment = ()=>import('views/home/shopcomment')
let pay = ()=>import('views/pay/pay')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/mime',
    component: mime
  },
  {
    path: '/home/newslist',
    component: newslist
  },
  {
    path: '/home/newsdetail/:id',
    component: newsdetail
  },
  {
    path: '/home/imglist',
    component: imglist
  },
  {
    path: '/home/imgdetail/:id',
    component: imgdetail
  },
  {
    path: '/home/shoplist',
    component: shoplist
  },
  {
    path: '/home/shopdetail/:id',
    component: shopdetail
  }, {
    path:'/home/shopdesc/:id',
    component:shopdesc
  },
  {
    path:'/home/shopcomment',
    component:shopcomment
  },
  {
    path:'/pay',
    component:pay
  }
]
let router = new VueRouter({
  routes,
  // mode: 'history'
})
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    window.location.reload();
    // router.replace(router.history.pending.fullPath);
  }else{
    console.log(error)
  }
})
export default router
