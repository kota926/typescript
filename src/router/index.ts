import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store/index'
import Auth from '@aws-amplify/auth'
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components"
import { Hub, API, graphqlOperation } from 'aws-amplify'
import { createUser } from '../graphql/mutations'
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
  },
  {
    path: '/blank',
    name: 'Blank',
    component: () => import( '../views/Blank.vue'),
    meta: { requireAuth: true},
  },
  {
    path: '/transcription',
    name: 'Transcription',
    component: () => import( '../views/Transcription.vue'),
    meta: { requireAuth: true},
  },
  {
    path: '/arrangement',
    name: 'Arrangement',
    component: () => import( '../views/Arrangement.vue'),
    meta: { requireAuth: true},
  },

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
    store.commit("nullUser", null);
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

// const listener = async (data) => {
//   console.log('hub')
//   console.log(data)
//   if(data.payload.event === 'signUp') {
//     console.log('hub, signUp')
//     const d = data.payload.data
//     const userDetails = {
//       id: d.userSub,
//       name: d.user.username,
//       categories: ['カテゴリー'],
//     }
//     console.log(userDetails)
//     store.commit('setSignupUser', userDetails)
//   }
//   if(data.payload.event === 'signIn') {
//       console.log('hub, signin')
//       const userDetails = store.state.signupUser
//       const newUser = await API.graphql(graphqlOperation(
//           createUser,
//           {input: userDetails}
//         ));
//       console.log(newUser)
//       store.commit('setSignupUser', {id: "", name: "", categories: ['category']})
//     }
// }

// Hub.listen('auth', listener);

export default router
