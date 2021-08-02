<template>
    <v-container>
        <v-row dense>
            <v-col
                v-for="(item, key) in words" v-bind:key="key"
                cols="12"
                lg="6"
            >
                <v-card
                    white
                    outlined
                    elevation="10"
                >
                <div class="d-flex align-center">
                    <v-card-title class="text-h5">
                        {{ item.english }}
                    </v-card-title>
                    <v-card-title>
                        {{ item.japanese }}
                    </v-card-title>
                </div>
                <v-card-text>
                    {{ item.question }}
                </v-card-text>
                <v-card-text>
                    {{ item.translation }}
                </v-card-text>
                    <v-card-actions>
                        <v-row justify="end" class="pa-3">
                            <v-btn
                                outlined
                                color="red"
                                @click="deleteWord(item.id)"
                                class="mr-2"
                            >
                                削除
                            </v-btn>
                            
                            <v-btn
                            color="primary"
                            outlined
                            dark
                            @click="passWord(item)"
                            >
                            修正
                            </v-btn>
                            
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <template>
            <v-dialog
            v-model="dialog"
            max-width="600px"
            :retain-focus="false"
            >
    
            <v-card>
                <v-card-title>
                <span class="text-h5">{{ english }}</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-textarea
                        outlined
                        clearable
                        dense
                        rows="3"
                        name="input-7-4"
                        label="英文"
                        placeholder="問題の英文を記入"
                        v-model="question"
                    ></v-textarea>
                    <v-container class="d-flex flex-wrap justify-start">
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
                        md="4"
                        class="mb-n10"
                        >
                        <v-text-field
                            label="英語"
                            placeholder="半角"
                            filled
                            clearable
                            v-model="english"
                        ></v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        class="mb-n10"
                        >
                        <v-text-field
                            label="日本語"
                            placeholder="全角"
                            filled
                            clearable
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
                            clearable
                            v-model="translation"
                            class="p-1"
                        ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions class="d-flex justify-center">
                <v-btn
                    color="blue darken-1"
                    text
                    outlined
                    @click="dialog = false"
                >
                    閉じる
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    outlined
                    @click="correctWord"
                >
                    保存
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </template>
    </v-container>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { API, graphqlOperation } from 'aws-amplify';
    import { getList } from '../graphql/queries';
    import { deleteWord, updateWord } from '../graphql/mutations'

    @Component
    export default class WordTable extends Vue {
        dialog = false
        id = ""
        question = ""
        answerIndex = [] as number[]
        english = ""
        japanese = ""
        translation = ""
        words = []
        
        async created() {
            this.$store.commit('changeLoading', true)
            console.log(this.$store.state.currentListID)
            const list: any = await API.graphql(graphqlOperation(getList, {id: this.$store.state.currentListID}))
            this.$store.commit('changeCurrentList', list.data.getList)
            this.fetchWord()
            this.$store.commit('changeLoading', false)
        }

        fetchWord() {
            this.words = this.$store.state.currentList.words.items
        }

        get canAddWord() {
            if(this.trimedQuestion !== '' && this.answerIndex !== []) {
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
        // ワードテーブルからワードを削除
        async deleteWord(item_id) {
            const deletedWord = await API.graphql(graphqlOperation(deleteWord, {input: {id: item_id}}))
            console.log(deletedWord)
        
            this.$store.commit('deleteWord', item_id)
        }
        // ワード修正ダイアログにワードの情報を渡す
        passWord(item) {
            this.dialog = true
            this.id = item.id
            this.question = item.question
            this.answerIndex = item.answerIndex
            this.english = item.english
            this.japanese = item.japanese
            this.translation = item.translation
        }
        @Watch('answerIndex')
        onChangeWords(next) {
            console.log(next)
        }
        get questionArray() {
            const space = ' ' + ','
            const q = this.trimedQuestion.replaceAll(',', space)
            if(q.endsWith('.') || q.endsWith('?') || q.endsWith('!')) {
                return q.slice(0, -1).split(' ')
            }
            return q.split(' ') 
        }
        get selectedItem() {
            return (key) => {
                return this.answerIndex.some((k) => k === key)
            }
        }

        passKey(key) {
            const findKey = this.answerIndex.findIndex((item) => {
                return item === key
            })
            if(findKey === -1) {
                this.answerIndex.push(key)
                this.answerIndex.sort((a, b) => a - b)
            } else {
                this.answerIndex.splice(findKey, 1)
            }

            let answer = this.questionArray[this.answerIndex[0]]
            const array = this.answerIndex
            const keyArray = this.answerIndex
            const question = this.questionArray
            for(let i = 1; i < array.length; i++) {
                const word = ' ' + question[keyArray[i]]
                answer = answer + word
            }
            this.english = answer
        }

        // ワードを修正する
        async correctWord() {
            if(this.canAddWord) {
                const wordDetails = {
                    id: this.id,
                    question: this.trimedQuestion,
                    answerIndex: this.answerIndex,
                    english: this.nullEnglish,
                    japanese: this.nullJapanese,
                    translation: this.nullTranslation
                }
                const word: any = await API.graphql(graphqlOperation(updateWord, {input: wordDetails}))
                this.$store.commit('correctWord', word.data.updateWord)
                this.dialog = false
            }
        }
    }
</script>

<style scoped>

</style>