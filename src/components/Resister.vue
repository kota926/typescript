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
            placeholder="問題の英文を記入（TABキーで移動）"
            v-model="question"
            class="mb-n6"
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
                placeholder="空欄の単語（英文中の単語と完全一致）"
                outlined
                req
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
                placeholder="未記入の場合、解答と同一"
                filled
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
    import { Component, Vue } from 'vue-property-decorator';
    import { API, graphqlOperation } from 'aws-amplify';
    import { createWord } from '../graphql/mutations'

    @Component
    export default class Resister extends Vue {
        question = ""
        answer = ""
        english = ""
        japanese = ""
        translation = ""
        dialog = false

        // ワードを追加できるか判定
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

        async addWord() {
            if(this.canAddWord) {
                const wordDetails = {
                listID: this.$store.state.currentListID,
                question: this.trimedQuestion,
                answer: this.trimedAnswer,
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
                this.answer = ""
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

</style>