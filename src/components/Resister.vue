<template>
<v-form>
    <v-container>
        <v-textarea
            outlined
            dense
            rows="2"
            auto-grow
            name="input-7-4"
            label="英文"
            placeholder="問題の英文を記入"
            v-model="question"
            class="mb-n6"
        ></v-textarea>
        <v-chip v-if="isShown" class="py-6 my-2 text-body-1 max" outlined label>
            解答にしたい単語をクリック
        </v-chip>
        <v-container v-if="!isShown" class="d-flex flex-wrap justify-start">
            <v-btn v-for="(item, key) in questionArray" v-bind:key="key"
                class="mx-2 my-1"
                style="text-transform: none"
                @click="passKey(key)"
                :class="{ primary : selectedItem(key) }"
            >{{ item }}
            </v-btn>
        </v-container>
        <v-row>
            <v-col
            cols="12"
            sm="6"
            class="mb-n10"
            >
            <v-text-field
                label="英語"
                placeholder="未記入の場合、解答と同一"
                filled
                v-model="english"
            ></v-text-field>
            </v-col>

            <v-col
            cols="12"
            sm="6"
            class="mb-n10"
            >
            <v-text-field
                label="日本語"
                placeholder="見出しの和訳"
                filled
                v-model="japanese"
                class="p-1"
            ></v-text-field>
            </v-col>
            <v-col
            cols="12"
            class="mb-n10"
            >
            <v-text-field
                label="和訳"
                placeholder="英文の和訳"
                filled
                v-model="translation"
                class="p-1"
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row
            align="center"
            justify="center"
            class="my-2"
        >
            <v-col
                cols="12"
                align="center"
                justify="center"
            >
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    color="indigo"
                    @click="addWord"
                >
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog"
            max-width="480px">
            <v-card>
                <v-card-title>
                    不適な入力を検出
                </v-card-title>
                <v-card-text>
                    英文と解答の欄は必須です。解答の英単語は英文中の英単語と完全に一致している必要があります。
                </v-card-text>
                <v-card-actions 
                    class="d-flex justify-end">
                    <v-btn
                        @click="ok">
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</v-form>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { API, graphqlOperation, Auth } from 'aws-amplify';
    import { createWord } from '../graphql/mutations'
    import axios from 'axios'

    @Component
    export default class Resister extends Vue {
        question = ""
        selectedKeyArray = [] as number[]
        english = ""
        japanese = ""
        translation = ""
        dialog = false

        translatedEnglishText = ""

        get isShown() {
            if(this.trimedQuestion === "") {
                return true
            } else {
                return false
            }
        }

        // ワードを追加できるか判定
        get canAddWord() {
            if(this.trimedQuestion !== '' && this.selectedKeyArray !== []) {
                return true
            } else {
                return false
            }
        }
        get trimedQuestion() {
            return this.question.trim()
        }
        get trimedEnglish() {
            return this.english.trim()
        }
        get trimedJapanese() {
            return this.japanese.trim()
        }
        get trimedTranslation() {
            return this.translation.trim()
        }
        get nullEnglish() {
            if(this.trimedEnglish === "") {
                return "未記入"
            } else {
                return this.trimedEnglish
            }
        }
        get nullJapanese() {
            if(this.trimedJapanese === "") {
                return "未記入"
            } else {
                return this.trimedJapanese
            }
        }
        get nullTranslation() {
            if(this.trimedTranslation === "") {
                return "未記入"
            } else {
                return this.trimedTranslation
            }
        }

        // 問題文のカンマの前に空白を挿入し、ピリオドを消去したあと、単語ごとの配列にして返す。
        get questionArray() {
            const space = ' ' + ','
            const q = this.trimedQuestion.replaceAll(',', space)
            if(q.endsWith('.') || q.endsWith('?') || q.endsWith('!')) {
                return q.slice(0, -1).split(' ')
            }
            return q.split(' ') 
        }

        // クリックしたところのインデックスを格納、英語フォームに単語を渡す
        async passKey(key) {
            this.$store.commit('changeLoading', true)
            const findKey = this.selectedKeyArray.findIndex((item) => {
                return item === key
            })
            if(findKey === -1) {
                this.selectedKeyArray.push(key)
                this.selectedKeyArray.sort((a, b) => a - b)
            } else {
                this.selectedKeyArray.splice(findKey, 1)
            }

            let answer = this.questionArray[this.selectedKeyArray[0]]
            const array = this.selectedKeyArray
            const keyArray = this.selectedKeyArray
            const question = this.questionArray
            for(let i = 1; i < array.length; i++) {
                const word = ' ' + question[keyArray[i]]
                answer = answer + word
            }
            this.english = answer

            // 単語の翻訳
            // gateway 情報設定
            const user: any = await Auth.currentAuthenticatedUser()
            const idToken = user.signInUserSession.idToken.jwtToken
            const url = "https://77vphomoi3.execute-api.us-east-1.amazonaws.com/production/translation"
            const headers = { headers: {"Authorization": idToken}}

            console.log(this.english)
            if(this.english !== undefined) {
                    const param = {
                    text: this.english
                }
                const result: any = await axios.post(url, param, headers).catch((e) => {
                    console.log(e)
                    this.$store.commit('changeLoading', false)
                })
                console.log(result)
                this.japanese = result.data
            }
            
            // 問題文の翻訳
            if(this.trimedQuestion !== this.translatedEnglishText) {
                const param = {
                    text: this.trimedQuestion
                }
                const result: any = await axios.post(url, param, headers).catch((e) => {
                    console.log(e)
                    this.$store.commit('changeLoading', false)
                })
                console.log(result)
                this.translation = result.data

                this.translatedEnglishText = this.trimedQuestion
            }
            this.$store.commit('changeLoading', false)
        }

        // クリックされたボタンのクラスをアクティブにする
        get selectedItem() {
            return (key) => {
                return this.selectedKeyArray.some((k) => k === key)
            }
        }

        // questionqが変化したらselectedKeyArrayを初期化
        @Watch('trimedQuestion')
        onChangeQuestion() {
            this.selectedKeyArray = []
        }

        async addWord() {
            if(this.canAddWord) {
                const wordDetails = {
                listID: this.$store.state.currentListID,
                question: this.trimedQuestion,
                answerIndex: this.selectedKeyArray,
                english: this.nullEnglish,
                japanese: this.nullJapanese,
                translation: this.nullTranslation
                }
                // ワードをデータベースに追加
                const word: any = await API.graphql(graphqlOperation(createWord, {input: wordDetails}))
                console.log(word)
                // 画面更新のために vuex に追加したワード保存
                this.$store.commit('unshiftWord', word.data.createWord)

                this.question = ""
                this.selectedKeyArray = []
                this.english = ""
                this.japanese = ""
                this.translation = ""
            }
        }

        ok() {
            this.dialog = false
        }
    }
</script>

<style scoped>
.selected {
    background-color: #2196F3;
}
.max {
    width: 100%;
}
</style>