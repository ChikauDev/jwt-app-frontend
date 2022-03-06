import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _60a4bda6 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _70015c02 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _26f9b4cc = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _d9202cc4 = () => interopDefault(import('../pages/topics/index.vue' /* webpackChunkName: "pages/topics/index" */))
const _a1992c1e = () => interopDefault(import('../pages/topics/edit/index.vue' /* webpackChunkName: "pages/topics/edit/index" */))
const _6d34c6ad = () => interopDefault(import('../pages/topics/posts/edit/index.vue' /* webpackChunkName: "pages/topics/posts/edit/index" */))
const _32f088f4 = () => interopDefault(import('../pages/topics/_id.vue' /* webpackChunkName: "pages/topics/_id" */))
const _b34c8e2a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _60a4bda6,
    name: "dashboard"
  }, {
    path: "/login",
    component: _70015c02,
    name: "login"
  }, {
    path: "/register",
    component: _26f9b4cc,
    name: "register"
  }, {
    path: "/topics",
    component: _d9202cc4,
    name: "topics"
  }, {
    path: "/topics/edit",
    component: _a1992c1e,
    name: "topics-edit"
  }, {
    path: "/topics/posts/edit",
    component: _6d34c6ad,
    name: "topics-posts-edit"
  }, {
    path: "/topics/:id",
    component: _32f088f4,
    name: "topics-id"
  }, {
    path: "/",
    component: _b34c8e2a,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
