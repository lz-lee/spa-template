// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import VueTranslate from 'vue-translate-plugin'
// import VueValidator from 'vue-validator'

import 'element-ui/lib/theme-default/index.css'

Vue.use(VueResource)
Vue.use(VueTranslate)
Vue.use(ElementUI)

import filters from './libs/filters'
import store from './store'
import router from './router'

import App from './App'

// 初始化filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// ajax 拦截器
Vue.http.interceptors.push(function (request, next) {
	request.headers.set('token', store.state.User.password)
	next(response => {
		console.log(response)
	})
})

// router校验，{meta , path }这里也是参数解构，将 to对象中的meta 和path取出
router.beforeEach(({meta, path}, from, next) => {
	// 对象解构，并设置默认值
	let {auth = true} = meta
	let isLogin = Boolean(store.state.User.username)
	if (auth && !isLogin && path !== '/login') {
		return next({path: '/login'})
	}
	next()
})

window.eventBus = new Vue()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

