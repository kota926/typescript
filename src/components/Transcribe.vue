<template>
    <v-container>
        <div class="ma-4 text-h5">第{{ this.$store.state.currentIndex + 1 }}問</div>
        <div class="box7">
            <p>{{ currentWord.translation }}</p>
        </div>
        <v-row class="d-flex justify-center">
            <v-col class="11">
                <v-text-field
                    outlined
                    ref="answer"
                    v-model="yourAnswer"
                    class="form mx-auto"
                ></v-text-field>
            </v-col>
            <v-col cols="1">
                <p class="pt-4">{{ last }}</p>
            </v-col>
        </v-row>
        <div class="d-flex justify-center">
            <v-btn @click="skip">スキップ</v-btn>
        </div>
        <v-dialog
            v-model="dialog"
            persistent
        >
            <v-row class="d-flex justify-center">
                <v-col
                    cols="12"
                    sm="8"
                    md="6"
                    class="d-flex justify-center"
                >
                    <v-card
                        white
                        outlined
                        elevation="10"
                        class="card"
                    >
                        <div class="d-md-flex align-center">
                            <v-card-title>
                                英語：<div class="text-h5 text-sm-h4">{{ currentWord.english }}</div>
                            </v-card-title>
                            <v-card-title>
                                和訳：<div class="text-h5 text-sm-h4">{{ currentWord.japanese }}</div>
                            </v-card-title>
                        </div>
                        <v-card-text class="text-h6">
                            {{ currentWord.question }}
                        </v-card-text>
                        <v-card-text class="text-h6">
                            {{ currentWord.translation }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { API, graphqlOperation } from 'aws-amplify'
import { getList } from '../graphql/queries'

interface word {
    answerIndex: string;
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
@Component
export default class FillBlank extends Vue {
    currentList = {}
    yourAnswer = ""
    dialog = false
    visible = false
    list = {} as list
    words = [] as word[]
    currentWord = {} as word
    currentQuestion = ""
    last = ""
    matchedAnswer = ""
    
    created() {
        const list: any = API.graphql(graphqlOperation(getList, {id: this.$store.state.currentListID}))
        list.then((result) => {
            this.list = result.data.getList
            // ワードが１単語も登録されてなかったらホームに戻す
            if(result.data.getList.words.items.length === 0) {
                this.$router.push('Home')
            }
        })
    }
    // 正解判定
    @Watch('yourAnswer')
    onYourAnswer() {
        if(this.trimedAnswer === this.matchedAnswer) {
            this.yourAnswer = ""
            this.dialog = true
        }
    }
    // 正解したら解説ダイアログ見せる
    @Watch('dialog')
    onDialog(val) {
        const nextPage = () => {
            this.$store.commit('increaseIndex')
            this.dialog = false
        }
        const finish = () => {
            this.dialog = false
            this.$store.commit('resetIndex')
            this.$router.push('List')
        }
        const time = this.$store.state.time * 100
        if(val && this.$store.state.currentIndex < this.list.words.items.length - 1) {
            setTimeout(nextPage, time)
        } else if(val) {
            setTimeout(finish, time)
        }
    }
    
    @Watch('list')
    onChangeList(next, pre) {
        console.log(next)
        this.currentWord = next.words.items[this.$store.state.currentIndex]
    }

    @Watch('currentIndex')
    onChangeIndex(next, pre) {
        console.log(next)
        this.currentWord = this.list.words.items[next]
    }
    // 問題文の末尾を取り除く
    @Watch('currentWord')
    onChangeWord(next) {
        const q = next.question
        if(q.endsWith('.') || q.endsWith('?') || q.endsWith('!')) {
            this.last = q.slice(-1)
            this.matchedAnswer = q.slice(0, -1)
        } else {
            this.last = ''
            this.matchedAnswer = q
        }
        
    }

    get currentIndex() {
        return this.$store.state.currentIndex
    }

    get trimedAnswer() {
        return this.yourAnswer.trim()
    }
    
    skip() {
            this.yourAnswer = ""
            this.dialog = true
    }
    
}
</script>

<style scoped>
h1 {
  background: #dfefff;
  box-shadow: 0px 0px 0px 5px #dfefff;
  border: dashed 1px #96c2fe;
  padding: 0.1rem 0.5em;
  margin: 1rem;
  font-size: 30px;
  color: #454545;
  text-align: center;
  max-width: 130px;
}
.box7{
    padding: 0.5em 1em;
    margin: 2rem 1rem;
    color: #474747;
    background: whitesmoke;/*背景色*/
    border-left: double 7px #4ec4d3;/*左線*/
    border-right: double 7px #4ec4d3;/*右線*/
}
.box7 p {
    margin: 0; 
    padding: 0;
    font-size: larger;
    text-align: center;
}

@media screen and (max-width: 960px) {
    .card {
        width: 100%;
    }
}
</style>