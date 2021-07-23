import Vue from 'vue'
import Vuex from 'vuex'
import createdPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const option = {
  reducer: state => ({
    currentListID: state.currentListID,
    userID: state.userID
  }),
}

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
    userID: null,
    currentListID: null,
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
      state.userID = user.attributes.sub
    },
    nullUser(state, id) {
      state.user = null
      state.userID = null
      state.currentListID = null
    },
    changeCurrentListID(state, id) {
      state.currentListID = id
    },
    changeCurrentList(state, list) {
      state.currentList = list
    },
    unshiftWord(state, word) {
      console.log(state.currentList)
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
    },
    correctWord(state, word) {
      const listWords = state.currentList.words.items
      const index = listWords.findIndex((item) => {
        return item.id === word.id
      })
      listWords[index].question = word.question
      listWords[index].answer = word.answer
      listWords[index].english= word.english
      listWords[index].japanese = word.japanese
      listWords[index].translation = word.translation
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createdPersistedState(option)]
})
