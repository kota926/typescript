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
                    <v-row>
                        <v-col
                        cols="12"
                        sm="12"
                        md="4"
                        class="mb-n10"
                        >
                        <v-text-field
                            label="解答"
                            placeholder="空欄にしたい単語（文と完全一致）"
                            outlined
                            clearable
                            v-model="answer"
                        ></v-text-field>
                        </v-col>
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
    import { Component, Vue } from 'vue-property-decorator';
    import { API, graphqlOperation } from 'aws-amplify';
    import { getList } from '../graphql/queries';
    import { deleteWord, updateWord } from '../graphql/mutations'

    @Component
    export default class WordTable extends Vue {
        dialog = false
        id = ""
        question = ""
        answer = ""
        english = ""
        japanese = ""
        translation = ""
        words = []
        
        async created() {
            this.$store.commit('changeLoading', true)
            console.log(this.$store.state.currentListID)
            const list: any = await API.graphql(graphqlOperation(getList, {id: this.$store.state.currentListID}))
            console.log(list)
            this.$store.commit('changeCurrentList', list.data.getList)
            this.fetchWord()
            this.$store.commit('changeLoading', false)
        }

        fetchWord() {
            this.words = this.$store.state.currentList.words.items
        }

        get canAddWord() {
            if(this.trimedQuestion !== '' && this.trimedAnswer !== '') {
                return this.trimedQuestion.includes(this.trimedAnswer)
            } else {
                return false
            }
        }

        get trimedQuestion() {
            return this.question.trim()
        }
        get trimedAnswer() {
            return this.answer.trim()
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
                return this.trimedAnswer
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

        async deleteWord(item_id) {
            const deletedWord = await API.graphql(graphqlOperation(deleteWord, {input: {id: item_id}}))
            console.log(deletedWord)
        
            this.$store.commit('deleteWord', item_id)
        }

        passWord(item) {
            this.dialog = true
            this.id = item.id
            this.question = item.question
            this.answer = item.answer
            this.english = item.english
            this.japanese = item.japanese
            this.translation = item.translation
        }

        async correctWord() {
            if(this.canAddWord) {
                const wordDetails = {
                    id: this.id,
                    question: this.trimedQuestion,
                    answer: this.trimedAnswer,
                    english: this.nullEnglish,
                    japanese: this.nullJapanese,
                    translation: this.nullTranslation
                }
                console.log(wordDetails)
                const word: any = await API.graphql(graphqlOperation(updateWord, {input: wordDetails}))
                console.log(word)
                this.$store.commit('correctWord', word.data.updateWord)
                this.dialog = false
            }
        }
    }
</script>

<style scoped>

</style>