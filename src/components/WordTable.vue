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
                                
                                class="mr-2"
                            >
                                削除
                            </v-btn>
                            
                            <v-btn
                            color="primary"
                            outlined
                            dark
                            
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
                    @click="dialog = false"
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

    @Component
    export default class WordTable extends Vue {
        dialog = false
        id = ""
        question = ""
        answer = ""
        english = ""
        japanese = ""
        translation = ""
        words = [
            {
                        id: "201",
                        question: "This book is familiar to us.",
                        answer: "familiar",
                        english: "familiar",
                        japanese: "なじみのある",
                        translation: "この本はおなじみである。"
                    },
                    {
                        id: "202",
                        question: "I am happy with the result.",
                        answer: "result",
                        english: "result",
                        japanese: "結果",
                        translation: "結果に満足している。"
                    },
                    {
                        id: "203",
                        question: "This problem is suitable for class discussion.",
                        answer: "suitable",
                        english: "suitable",
                        japanese: "適した",
                        translation: "この問題はクラス討論にふさわしい。"
                    },
                    {
                        id: "204",
                        question: "He couldn't accept the news.",
                        answer: "accept",
                        english: "accept",
                        japanese: "受け入れる",
                        translation: "彼はそのニュースを受け入れられなかった。"
                    },
                    {
                        id: "205",
                        question: "Sales increased last month.",
                        answer: "increased",
                        english: "increase",
                        japanese: "増える",
                        translation: "先月は売上が増えた。"
                    },
                    {
                        id: "206",
                        question: "Lack of care was the cause of his death.",
                        answer: "cause",
                        english: "cause",
                        japanese: "原因",
                        translation: "世話をしなかったのが彼の死の原因だった。"
                    },
                    {
                        id: "207",
                        question: "You look similar to a soccer player.",
                        answer: "similar",
                        english: "similar",
                        japanese: "似ている",
                        translation: "サッカー選手に似てますね。"
                    },
                    {
                        id: "208",
                        question: "She adapts to new things quickly.",
                        answer: "adapts",
                        english: "adapt",
                        japanese: "適応する",
                        translation: "彼女は新しいことにすぐ適応する。"
                    },
                    {
                        id: "209",
                        question: "We are facing a political crisis",
                        answer: "political",
                        english: "political",
                        japanese: "政治の",
                        translation: "私達は政治的危機に直面している。"
                    },
                    {
                        id: "210",
                        question: "Are you serious?",
                        answer: "serious",
                        english: "serious",
                        japanese: "真面目な、本気の",
                        translation: "本気なの？"
                    },
        ]

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
    }
</script>

<style scoped>

</style>