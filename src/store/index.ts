import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface word {
  answer: string;
  createdAt: string;
  english: string;
  id: string;
  japanese: string;
  listID: string;
  owner: string;
  question: string;
  translation: string;
  updatedAt: string
}

interface list {
  categories: string[];
  createdAt: string;
  id: string;
  owner: string;
  title: string;
  updatedAt: string;
  user: any;
  userID: string;
  words: {items: word[]}
}

export default new Vuex.Store({
  state: {
    user: null,
    currentID: "",
    currentList: {} as list,
    // signupUser: {
    //   id: "",
    //   name: "",
    //   categories: ["category"]
    // },
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    // setSignupUser(state, user) {
    //   state.signupUser = user
    // },
    changeCurrentID(state, id) {
      state.currentID = id
    },
    changeCurrentList(state, list) {
      state.currentList = list
    },
    unshiftWord(state, word) {
      state.currentList.words.items.unshift(word)
    },
    deleteWord(state, word_id) {
      const findID = state.currentList.words.items.findIndex((word) => {
        return word.id === word_id
      })
      if(findID !== -1) {
        state.currentList.words.items.splice(findID, 1)
        console.log("deleteWord is executed")
      } 
    }
  },
  actions: {
  },
  modules: {
  },
})
