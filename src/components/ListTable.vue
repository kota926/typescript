<template>
    <v-container class="max">
        <v-row v-for="(list, key) in lists" v-bind:key="key">
            <v-col cols="12">
                <v-card
                    white
                    outlined
                    elevation="10"
                >
                    <v-card-title class="text-h5">
                        {{ list.title }}
                    </v-card-title>

                    <v-card-subtitle class="d-flex flex-wrap">
                        <div v-for="(item, key) in list.categories" v-bind:key="key">
                            <v-chip
                                class="ma-1"
                                color="gray"
                                text-color="black"
                                outlined
                                small
                            >
                                {{ item }}
                            </v-chip>
                        </div>
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="5"
                                md="7"
                                lg="8"
                                class="d-flex
                                    justify-center
                                    justify-sm-end
                                    mb-n4
                                    "
                                >
                                <v-btn
                                    outlined
                                    color="green"
                                    @click="toCorrect(list.id)"
                                >
                                    詳細
                                </v-btn>
                                <v-btn
                                    outlined
                                    color="red"
                                    class="ml-8 ml-sm-3"
                                    @click="toggleBtn"
                                >
                                    削除
                                </v-btn>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="7"
                                md="5"
                                lg="4"
                                class="d-flex
                                    justify-space-around
                                    justify-sm-end"
                                >
                                <v-btn
                                    outlined
                                    color="indigo"
                                    @click="toBlank(list.id)"
                                >
                                    空欄補充
                                </v-btn>
                                <v-btn
                                    outlined
                                    color="indigo"
                                    class="mx-sm-3"
                                    @click="toArrange(list.id)"
                                >
                                    並べ替え
                                </v-btn>
                                <v-btn
                                    outlined
                                    color="indigo"
                                   @click="toTranscription(list.id)"
                                >
                                    書き取り
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
            <template>
                <v-row justify="center">
                    <v-dialog
                    v-model="dialog"
                    max-width="320"
                    :retain-focus="false"
                    >
                    <v-card>
                        <v-card-title class="text-h5">
                        {{ list.title }} を削除してもよろしいですか？
                        </v-card-title>

                        <v-card-text>
                        {{ list.title }} はローカルストレージ上から削除されます。
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="green darken-1"
                            text
                            @click="toggleBtn"
                        >
                            戻る
                        </v-btn>

                        <v-btn
                            color="green darken-1"
                            text
                            @click="deleteList(list.id)"
                        >
                            削除
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-row>
            </template>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { API, graphqlOperation } from 'aws-amplify';
    import Auth from '@aws-amplify/auth'
    import { listUsers, getUser } from '../graphql/queries'
    import { createUser, createList, createWord, deleteList } from '../graphql/mutations'

    @Component
    export default class ListTable extends Vue {
        dialog = false
        lists = []

        async created() {
            this.$store.commit('changeLoading', true)
            await this.createUser()
            this.fetchUser()
            this.$store.commit('changeLoading', false)
        }

        // 初めてログインする際、初期データをデータベースにcreateする
        public async createUser() {
            const user = await Auth.currentAuthenticatedUser()
            const userDetails = {
                id: user.attributes.sub,
                name: user.username,
                categories: ['カテゴリー']
            }
            
            const userList: any = await API.graphql(graphqlOperation(listUsers))
            
            const existsUser = userList.data.listUsers.items.some((user) => {
                return user.id === userDetails.id
            })
            if(!existsUser) {
                const result: any = await API.graphql(graphqlOperation(createUser, {input: userDetails}))
                console.log(result)
                const listDetails = {
                    title: 'サンプル',
                    userID: this.$store.state.user.attributes.sub,
                    categories: ['カテゴリー']
                }
                
                const createdList: any = await API.graphql(graphqlOperation(createList, {input: listDetails}))
                console.log(createdList)
                const words = [
                    {
                        id: "201",
                        question: "This book is familiar to us.",
                        answerIndex: [3],
                        english: "familiar",
                        japanese: "なじみのある",
                        translation: "この本はおなじみである。"
                    },
                    {
                        id: "202",
                        question: "I am happy with the result.",
                        answerIndex: [5],
                        english: "result",
                        japanese: "結果",
                        translation: "結果に満足している。"
                    },
                    {
                        id: "203",
                        question: "This problem is suitable for class discussion.",
                        answerIndex: [3],
                        english: "suitable",
                        japanese: "適した",
                        translation: "この問題はクラス討論にふさわしい。"
                    },
                    {
                        id: "204",
                        question: "He couldn't accept the news.",
                        answerIndex: [2],
                        english: "accept",
                        japanese: "受け入れる",
                        translation: "彼はそのニュースを受け入れられなかった。"
                    },
                    {
                        id: "205",
                        question: "Sales increased last month.",
                        answerIndex: [1],
                        english: "increase",
                        japanese: "増える",
                        translation: "先月は売上が増えた。"
                    },
                    {
                        id: "206",
                        question: "Lack of care was the cause of his death.",
                        answerIndex: [5],
                        english: "cause",
                        japanese: "原因",
                        translation: "世話をしなかったのが彼の死の原因だった。"
                    },
                    {
                        id: "207",
                        question: "You look similar to a soccer player.",
                        answerIndex: [2],
                        english: "similar",
                        japanese: "似ている",
                        translation: "サッカー選手に似てますね。"
                    },
                    {
                        id: "208",
                        question: "She adapts to new things quickly.",
                        answerIndex: [1],
                        english: "adapt",
                        japanese: "適応する",
                        translation: "彼女は新しいことにすぐ適応する。"
                    },
                    {
                        id: "209",
                        question: "We are facing a political crisis",
                        answerIndex: [4],
                        english: "political",
                        japanese: "政治の",
                        translation: "私達は政治的危機に直面している。"
                    },
                    {
                        id: "210",
                        question: "Are you serious?",
                        answerIndex: [2],
                        english: "serious",
                        japanese: "真面目な、本気の",
                        translation: "本気なの？"
                    },
                ]
                words.forEach(async (word) => {
                    const wordDetails = {
                    listID: createdList.data.createList.id,
                    question: word.question,
                    answerIndex: word.answerIndex,
                    english: word.english,
                    japanese: word.japanese,
                    translation: word.translation
                    }
                    await API.graphql(graphqlOperation(createWord, {input: wordDetails}))
                })
            }
        }
        // インスタンス生成後ユーザーが持っているリスト一覧を取得する
        public async fetchUser() {
            const user: any = await API.graphql(graphqlOperation(getUser, {id: this.$store.state.user.attributes.sub}))
            console.log(user)
            this.lists = user.data.getUser.lists.items
        }
        // リストページに飛ぶ
        async toCorrect(item_id: string) {
            this.$store.commit('changeCurrentListID', item_id)
            this.$router.push('List')
        }
        // 戻るときダイアログを閉じる
        toggleBtn() {
            if(this.dialog) {
                this.dialog = false
            } else {
                this.dialog = true
            }
        }
        // リストを消す
        deleteList(item_id) {
            const deletedList: any = API.graphql(graphqlOperation(deleteList, {input: {id: item_id}}))
            console.log(deletedList)
            deletedList.then(() => {
                this.fetchUser()
            })
            this.dialog = false
        }
        // 空欄補充問題へ移動する
        toBlank(id) {
            this.$store.commit('changeCurrentListID', id)
            this.$router.push('Blank')
        }
        // 並び替え問題へ移動する
        toArrange(id) {
            this.$store.commit('changeCurrentListID', id)
            this.$router.push('Arrangement')
        }
        // 書き取り問題に移動する
        toTranscription(id) {
            this.$store.commit('changeCurrentListID', id)
            this.$router.push('Transcription')
        }
    }
</script>

<style scoped>
ul {
    list-style: none;
}
.max {
    max-width: 1000px;
}
</style>