import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '../page/LoginView.vue'
import PagesView from '../page/PagesView.vue'
import DetailView from '../page/DetailView.vue'
import ContestantView from '../page/ContestantView.vue'
import NewsManageView from '../page/NewsManageView.vue'
import MessageView from '../page/MessageView.vue'
import ueditor from '../components/UeditorControl.vue'
import Review from '../page/reviewView.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    /* *
     * 全局路由重定向
     * */
    {
      path: '/',
      name: 'hkjyyds',
      redirect: '/hkjyyds/'
    },
    /* *
     * 登录路由
     * */
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
      meta: {
        title: '登录'
      }
    },
    /* *
     * 错误路由
     * */
    {
      path: '*',
      redirect: '/hkjyyds'
    },
    {
      path: '/hkjyyds',
      component: PagesView,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '',
          redirect: '/hkjyyds/contestant'
        },
        {
          path: 'addNews',
          name: 'ueditor',
          component: ueditor,
          meta: {
            title: '新闻编辑'
          }
        },
        {
          path: 'detail',
          name: 'DetailView',
          component: DetailView,
          meta: {
            title: '选手详情'
          }
        },
        {
          path: 'contestant',
          name: 'ContestantView',
          component: ContestantView,
          meta: {
            title: '选手列表'
          }
        },
        {
          path: 'newsManage',
          name: 'NewsManageView',
          component: NewsManageView,
          meta: {
            title: '新闻列表'
          }
        },
        {
          path: 'messageList',
          name: 'MessageView',
          component: MessageView,
          meta: {
            title: '消息列表'
          }
        },
        {
          path: 'review',
          name: 'Review',
          component: Review,
          meta: {
            title: '新闻详情'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
