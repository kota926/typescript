<template>
    <v-container>
        <div class="ma-4 text-h5">第{{ currentIndex + 1 }}問</div>
        <div class="box7">
            <p>{{ currentWord.translation }}</p>
        </div>
        <v-sheet min-height="150">
            <v-container class="d-flex flex-wrap justify-start">
                <v-btn v-for="(item, key) in yourAnswer" v-bind:key="key"
                    class="mx-2 my-1"
                    style="text-transform: none"
                    @click="removeWord(item, key)"
                >{{ item }}
                </v-btn>
                <v-btn class="mx-2 my-1" disabled>
                    {{ last }}
                </v-btn>
            </v-container>
        </v-sheet>
        <v-sheet min-height="150">
            <v-container class="d-flex flex-wrap justify-start">
                <v-btn v-for="(item, key) in questionArray" v-bind:key="key"
                    class="mx-2 my-1"
                    style="text-transform: none"
                    @click="passWord(item, key)"
                    :disabled='isActive(key)'
                >{{ item }}
                </v-btn>
            </v-container>
        </v-sheet>
        <div class="d-flex justify-center mt-10">
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
    export default class Arrange extends Vue {
        currentList = {}
        yourAnswer = [] as string[]
        dialog = false
        visible = false
        list = {} as list
        words = [] as word[]
        currentWord = {} as word
        correctArray = []
        questionArray = [] as string[]
        last = ""
        selectedKey = [] as number[]

        created() {
            const list: any = API.graphql(graphqlOperation(getList, {id: this.$store.state.currentListID}))
            console.log(list)
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
            if(this.yourAnswer.toString() === this.correctArray.toString()) {
                this.yourAnswer = []
                this.selectedKey = []
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
            // 時間が経ったら次の問題へ
            const time = this.$store.state.time * 100
            if(val && this.$store.state.currentIndex < this.list.words.items.length - 1) {
                setTimeout(nextPage, time)
            } else if(val) {
                setTimeout(finish, time)
            }
        }
        
        @Watch('list')
        onChangeList(next, pre) {
            this.currentWord = next.words.items[this.$store.state.currentIndex]
        }

        @Watch('currentIndex')
        onChangeIndex(next, pre) {
            this.currentWord = this.list.words.items[next]
        }
        // 問題のピリオドを取り除き、スペースで区切って配列にする
        @Watch('currentWord')
        onChangeWord(next, pre) {
            const space = ' ' + ','
            const q = next.question.replaceAll(',', space)
            if(q.endsWith('.') || q.endsWith('?') || q.endsWith('!')) {
                this.correctArray = q.slice(0, -1).split(" ")
                this.last = q.slice(-1)
            } else {
                this.correctArray = q.split(' ')
                this.last = ''
            }
        }
        // 単語をシャッフルする
        @Watch('correctArray')
        onChangeArray(next) {
            const array = next.concat()
            for (let i = array.length; 1 < i; i--) {
                let k = Math.floor(Math.random() * i);
                [array[k], array[i - 1]] = [array[i - 1], array[k]];
            }
            this.questionArray = array
        }

        get currentIndex() {
            return this.$store.state.currentIndex
        }
        // クリックした単語を解答に送る、disableにする
        passWord(item: string, key: number) {
            this.yourAnswer.push(item)
            this.selectedKey.push(key)
        }

        get isActive() {
            return (key) => {
                return this.selectedKey.some((k) => k === key)
            }
        }
        // クリックした単語を問題に戻す
        removeWord(item, key) {
            // this.questionArray.push(item)
            const index = this.yourAnswer.findIndex((word) => {
                return word === item
            })
            this.yourAnswer.splice(index, 1)

            const keyIndex = this.selectedKey.findIndex((k) => k === key)
            this.selectedKey.splice(index, 1)
        }
        // 問題を飛ばす
        skip() {
                this.yourAnswer = []
                this.selectedKey = []
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
    margin: 0.5rem 1rem 2rem;
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