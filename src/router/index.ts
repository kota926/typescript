import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store/index'
import Auth from '@aws-amplify/auth'
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requireAuth: true},
  },
  {
    path: '/list',
    name: 'List',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/List.vue'),
    meta: { requireAuth: true},
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function getAuthenticatedUser() {
  return Auth.currentAuthenticatedUser().then((data) => {
    console.log(data)
    if(data && data.signInUserSession) {
      console.log("sending data to setUser")
      store.commit("setUser", data);
      return data
    }
  }).catch((e) => {
    console.error(e);
    store.commit("setUser", null);
    return null
  });
}

let user;

router.beforeResolve(async (to, from, next) => {
  user = await getAuthenticatedUser();

  if(to.name === "SignIn" && user) {
    console.log('redirect to home')
    return next({ name: "Home"})
  }
  if(to.matched.some((record) => record.meta.requireAuth) && !user) {
    console.log('redirect to singIn')
    return next({ name: "SignIn" })
  }
  return next()
});

onAuthUIStateChange((authState, authData) => {
  console.log('onAuthUIStateChange')
  if(authState === AuthState.SignedIn && authData) {
    console.log('if true')
    router.push({ name: "Home"});
  }
  if(authState === AuthState.SignedOut) {
    console.log('if false')
    router.push({ name: "SignIn" });
  }
})

export default router
