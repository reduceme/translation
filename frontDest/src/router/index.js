import Vue from 'vue'
import Router from 'vue-router'
import PagesView from '../pages/PagesView.vue'
import AboutCompetition from '../pages/AboutCompetitionView.vue'
import Mechanism from '../pages/MechanismView.vue'
import Schedule from '../pages/ScheduleView.vue'
import Document from '../pages/DocumentView.vue'
import Dynamic from '../pages/DynamicView.vue'
import Registered from '../pages/RegisteredView.vue'
import RegisteredChild from '../components/Registered.vue'
import Notice from '../components/Notice.vue'
import CompleteRegistered from '../components/CompleteRegistered.vue'
import Login from '../pages/LoginView.vue'
import PersonalCenter from '../pages/PersonalCenterView.vue'
import LoginComponent from '../components/Login.vue'
import ForgetPsw from '../components/ForgetPassword.vue'
import NewsDetails from '../pages/NewsDetails.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'hkjyyds',
      redirect: '/hkjyyds/'
    },
    {
      path: '*',
      redirect: '/hkjyyds/about'
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
          redirect: '/hkjyyds/about'
        },
        {
          path: 'about',
          name: 'AboutCompetition',
          component: AboutCompetition,
          meta: {
            title: '首届全国核行业科技英语演讲大赛'
          }
        },
        {
          path: 'mechanism',
          name: 'mechanism',
          component: Mechanism,
          meta: {
            title: '首届全国核行业科技英语演讲大赛'
          }
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: Schedule,
          meta: {
            title: '首届全国核行业科技英语演讲大赛'
          }
        },
        {
          path: 'document',
          name: 'document',
          component: Document,
          meta: {
            title: '首届全国核行业科技英语演讲大赛'
          }
        },
        {
          path: 'dynamic',
          name: 'dynamic',
          component: Dynamic,
          meta: {
            title: '首届全国核行业科技英语演讲大赛'
          }
        },
        {
          path: 'newsDetails',
          name: 'newsDetails',
          component: NewsDetails,
          meta: {
            title: '首届全国核行业科技英语演讲大赛'
          }
        },
        {
          path: 'login',
          name: 'login',
          component: Login,
          children: [{
            path: '',
            redirect: 'loginComponent'
          }, {
            path: 'loginComponent',
            name: 'loginComponent',
            component: LoginComponent,
            meta: {
              title: '首届全国核行业科技英语演讲大赛'
            }
          }, {
            path: 'forgetPsw',
            name: 'forgetPsw',
            component: ForgetPsw,
            meta: {
              title: '首届全国核行业科技英语演讲大赛'
            }
          }]
        },
        {
          path: 'registered',
          name: 'registered',
          component: Registered,
          children: [{
            path: '',
            // redirect: '/hkjyyds/registered/registeredChild'
            redirect: 'registeredChild'
          },
          {
            path: 'registeredChild',
            name: 'registeredChild',
            component: RegisteredChild,
            meta: {
              title: '首届全国核行业科技英语演讲大赛'
            }
          },
          {
            path: 'notice',
            name: 'notice',
            component: Notice,
            meta: {
              title: '首届全国核行业科技英语演讲大赛'
            }
          },
          {
            path: 'completeRegistered',
            name: 'completeRegistered',
            component: CompleteRegistered,
            meta: {
              title: '首届全国核行业科技英语演讲大赛'
            }
          }]
        }, {
          path: 'personalCenter',
          name: 'personalCenter',
          component: PersonalCenter,
          meta: {
            title: '首届全国核行业科技英语演讲大赛'
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
