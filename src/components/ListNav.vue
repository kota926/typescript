<template>
    <div>
        <v-system-bar
        color="grey darken-4"
        dark
        ></v-system-bar>

        <v-app-bar
        dark
        color="blue-grey darken-4"
        max-height="100"
        >
            <v-row>
                <v-col cols="10" class="d-flex align-center">
                    <v-btn
                        class="ma-2"
                        color="blue-grey darken-1"
                        dark
                        @click="toHome"
                    >
                        <v-icon
                        dark
                        left
                        >
                        mdi-arrow-left
                        </v-icon>
                        {{ responsiveBack }}
                    </v-btn>
                    <v-toolbar-title class="mx-3">{{ list.title }}</v-toolbar-title>
                </v-col>
                <v-col cols="2" class="d-flex justify-end">
                    <template>
                        <v-dialog
                        v-model="dialog"
                        max-width="600px"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="ma-2 mr-1 mr-sm-4 mr-md-8"
                                outlined
                                fab
                                color="gray"
                                v-bind="attrs"
                                v-on="on"
                                @click="passCategories"
                                small
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="text-h5">情報設定</span>
                            </v-card-title>
                            <v-card-text>
                            <v-container>
                                <v-text-field
                                    v-model="titleName"
                                    label="タイトル"
                                    outlined
                                    clearable
                                    
                                    required
                                ></v-text-field>
                                <v-row>
                                    <v-col
                                    cols="12"
                                    >
                                    <v-select
                                    v-model="selectedCategories"
                                    :items="categories"
                                    label="カテゴリー"
                                    multiple
                                    chips
                                    >
                                    </v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col
                                        cols="12"
                                        sm="10"
                                    >
                                        <v-text-field
                                            v-model="categoryName"
                                            label="カテゴリーを追加"
                                            outlined
                                            clearable
                                            class="mb-n10"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="2"
                                        class="d-flex justify-center"
                                    >
                                        <v-btn
                                            class="mx-2"
                                            fab
                                            dark
                                            color="indigo"
                                            @click="addCategory"
                                        >
                                        <v-icon dark>
                                            mdi-plus
                                        </v-icon>
                                        </v-btn>                                        
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col
                                        cols="12"
                                        sm="10"
                                    >
                                        <v-select
                                            v-model="deletedCategory"
                                            :items="categories"
                                            label="カテゴリーを削除"
                                            outlined
                                            clearable
                                            class="mb-n10"
                                        ></v-select>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="2"
                                        class="d-flex justify-center"
                                    >
                                        <v-btn
                                            class="mx-2"
                                            fab
                                            dark
                                            color="indigo"
                                            @click="deleteCategory"
                                        >
                                        <v-icon dark>
                                            mdi-delete
                                        </v-icon>
                                        </v-btn>                                        
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
                                @click="correctInfo"
                            >
                                保存
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </template>
                </v-col>
            </v-row>
            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
                color="cyan"
            ></v-progress-linear>
        </v-app-bar>
        <slot />
        <v-container class="d-flex justify-center">
            <v-btn
                outlined
                color="indigo"
                class="ma-2 ma-sm-4 mb-10"
                @click="toTest()"
            >
                空欄補充
            </v-btn>
            <v-btn
                outlined
                color="indigo"
                class="ma-2 ma-sm-4 mb-10"
                @click="toArrange()"
            >
                並べ替え
            </v-btn>
            <v-btn
                outlined
                color="indigo"
                class="ma-2 ma-sm-4 mb-10"
                @click="toTranscribe()"
            >
                書き取り
            </v-btn>
        </v-container>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { API, graphqlOperation } from 'aws-amplify';
    import { getList, getUser } from '../graphql/queries'
    import { updateUser, updateList } from '../graphql/mutations'

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
    @Component
    export default class ListNav extends Vue {
        dialog = false
        categoryName = ""
        deletedCategory = ""
        categories = ["カテゴリー"]
        selectedCategories: string[] = []
        titleName = ""
        currentInfo = {}
        list = {} as list

        created() {
            const list: any = API.graphql(graphqlOperation(getList, {id: this.$store.state.currentListID}))
            console.log(list)
            list.then((result) => {
                console.log(result)
                this.list = result.data.getList
            })
        }

        get loading() {
            return this.$store.state.loading
        }

        get trimedTitle() {
            return this.titleName.trim()
        }
        get trimedCategory() {
            return this.categoryName.trim()
        }
        get responsiveBack() {
            if(document.documentElement.clientWidth < 450) {
                return ''
            } else {
                return 'Back'
            }
        }

        passCategories() {
            const user: any = API.graphql(graphqlOperation(getUser, {id: this.$store.state.userID}))
            console.log(user)
            user.then((result) => {
                this.titleName = this.list.title
                this.selectedCategories = this.list.categories
                this.categories = result.data.getUser.categories
                this.deletedCategory = ""
                this.categoryName = ""
            })
            
        }

        async addCategory() {
            this.categories.push(this.trimedCategory)
            const categoryDetails = {
                id: this.$store.state.userID as string,
                categories: this.categories
            }
            console.log(categoryDetails)
            const updatedCategory = await API.graphql({ query: updateUser, variables: {input: categoryDetails}})
            console.log(updatedCategory)
            this.categoryName = ""
        }

        async correctInfo() {
            const infoDetails = {
                id: this.$store.state.currentListID,
                title: this.trimedTitle,
                categories: this.selectedCategories
            }
            const updatedList = await API.graphql(graphqlOperation(updateList, {input: infoDetails}))
            console.log(updatedList)
            const list: any = await API.graphql(graphqlOperation(getList, {id: this.$store.state.currentListID}))
            console.log(list)

            this.list = list.data.getList
            this.dialog = false
        }

        async deleteCategory() {
            const listIndex = this.list.categories.findIndex((category) => {
                return category === this.deletedCategory
            })
            if(listIndex !== -1) {
                this.list.categories.splice(listIndex, 1)
                const newCategories = {
                    id: this.$store.state.currentListID,
                    categories: this.list.categories
                }
                const updatedList = await API.graphql(graphqlOperation(updateList, {input: newCategories}))
                console.log(updatedList)
            }
            const userIndex = this.categories.findIndex((category) => {
                return category === this.deletedCategory
            })
            this.categories.splice(userIndex, 1)
            const userDetails = {
                id: this.$store.state.userID,
                categories: this.categories
            }
            const deletedUser: any = await API.graphql(graphqlOperation(updateUser, {input: userDetails}))
            console.log(deletedUser)
            const lists = deletedUser.data.updateUser.lists.items
            lists.forEach(async (list) => {
                const index = list.categories.findIndex((category) => {
                    return category === this.deletedCategory
                })
                
                if(index !== -1) {
                    list.categories.splice(index, 1)
                    const details = {
                        id: list.id,
                        categories: list.categories
                    }
                    const newList = await API.graphql(graphqlOperation(updateList, {input: details}))
                    console.log(newList)
                }
            });
        }

        toHome() {
            this.$router.push('/home')
        }
        toTest() {
            this.$router.push('Blank')
        }
        toArrange() {
            this.$router.push('Arrangement')
        }
        toTranscribe() {
            this.$router.push('Transcription')
        }
    }
</script>

<style scoped>

</style>