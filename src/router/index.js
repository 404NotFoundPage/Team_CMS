import Vue from 'vue'
import Router from 'vue-router'
import user from '@/components/userManage'
import userdetail from '@/components/user/userdetails'
import mainpage from '@/components/mainPage'
import producttype from '@/components/producttype'
import productContent from '@/components/productContent'
import productManage from '@/components/productManage'
import ContentManagement from '@/components/ContentManagement'
import RecomForBur from '@/components/Content/RecomForBur'
import NewArrivals from '@/components/Content/NewArrivals'
import UserCase from '@/components/Content/UserCase'
import addproduct from '@/components/addproduc'
import head from '@/components/head'
import left from '@/components/left'
import login from '@/views/login/login'
import dingdanguanli from '@/components/dingdanguanli'

Vue.use(Router)

export default new Router({
  mode:'history',
  // linkActiveClass:"active",
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
    path: '/index',
    components: {
      head: head,
      left: left,
      body:mainpage
    },
      children:[
        {
          path:'/index',
          components:{
            body:mainpage
          }
        },
      {
        path: 'user',
        name: 'user',
        components: {
          body: user
        }
      },
      {
        path:'userdetail/:user_id',
        name:'userdetail',
        components:{
          body:userdetail
        }
      },
      {
        path:'producttype',//商品类型
        name:'producttype',
        components: {
          body: producttype
        }
      },
      {
        path:'productManage',
        name:'productManage',
        components: {
          body: productManage
        }
      },
      {
        path: 'dingdanguanli',
        name: 'dingdanguanli',
        components: {
          body: dingdanguanli
        }
      },
      {
        path: 'ContentManagement',
        name: 'ContentManagement',
        components: {
          body: ContentManagement
        },
        children:[
          {
            path: 'RecomForBur',
            name: 'RecomForBur',
            components: {
              body:RecomForBur
            }
          },
          {
            path: 'NewArrivals',
            name: 'NewArrivals',
            components: {
              body:NewArrivals
            }
          },
          {
            path: 'UserCase',
            name: 'UserCase',
            components: {
              body:UserCase
            }
          }
        ]
      }
    ]
  }
  ]
})
