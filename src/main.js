import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/theme.css'
import './assets/css/character.css'
import 'vant/lib/icon/local.css';
import './assets/scss/global.scss'
import './assets/scss/iconfont/iconfont.css'
import {Message} from 'element-ui'
import {Icon, Cell, CellGroup, loading, Button, Toast } from 'vant';
Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(loading);
Vue.use(Button);
Vue.use(Toast);
Vue.use(ElementUI);
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')
})

router.beforeEach((to,from,next) => {
  if(to.matched.some( m => m.meta.auth)){

    if(store.state.isLogin==200) {
      next()
    }
  else{
      Message.error("请先登录")
      // this.$message('这是一条消息提示');
      // this.$message({
      //   message:'这是一条提示信息'
      // });
      next({path:'/login'})
    }
    }else{
      next()
    }
  })
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
