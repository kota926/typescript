<template>
    <div style="position: relative;">
        <v-system-bar
        color="grey darken-4"
        dark
        ></v-system-bar>

        <v-app-bar
        dark
        color="blue-grey darken-4"
        min-height="60"
        >
            <v-btn
            class="mx-2 ml-lg-8"
            fab
            dark
            color="teal"
            @click.stop="drawer = !drawer"
            >
            <v-icon dark>
                mdi-format-list-bulleted-square
            </v-icon>
            </v-btn>

            <v-toolbar-title
                class="ml-sm-4 ml-lg-8">カスタム英文帳
            </v-toolbar-title>
            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
                color="cyan"
            ></v-progress-linear>
        </v-app-bar>
        <slot />
        <v-row
            align="center"
            justify="center"
            class="my-2"
        >
            <v-btn
                class="mx-2"
                fab
                dark
                color="indigo"
                @click="addList"
            >
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>
        </v-row>
        <v-navigation-drawer
            v-model="drawer"
            temporary
            absolute
            class="drawer"
        >
            <v-list>
                <v-list-item>
                    <v-chip label outlined class="text-body-1 mx-auto mb-6 ma-6">
                        {{ name }}
                    </v-chip>
                </v-list-item>
                <!-- <v-list-item @click="dialog = true">
                    <v-list-item-icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>ローカルストレージ初期化</v-list-item-title>
                </v-list-item> -->
                <v-list-item>
                    <v-btn
                    @click="signOut"
                    color="primary"
                    outlined
                    class="mx-auto"
                    >
                    ログアウト
                    </v-btn>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-row justify="center">
            <v-dialog
            v-model="dialog"
            max-width="460"
            >
            <v-card>
                <v-card-title class="text-h5">
                データを初期化しますか?
                </v-card-title>

                <v-card-text>
                記録したすべてのデータがローカルストレージから削除されます。よろしいですか？
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="blue darken-1"
                    outlined
                    @click="dialog = false"
                >
                    No
                </v-btn>

                <v-btn
                    color="red darken-1"
                    outlined
                    @click="clear"
                    class="ml-4"
                >
                    Yes
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { API, graphqlOperation } from 'aws-amplify'
    import { createList } from '../graphql/mutations'
    import { Auth } from 'aws-amplify'

    @Component
    export default class HomeNAv extends Vue {
        drawer = false
        dialog = false
        name = ""

        async created() {
            const user = await Auth.currentAuthenticatedUser()
            this.name = user.username
        }

        get loading() {
            return this.$store.state.loading
        }

        // プラスボタンを押すとリストを追加し、リストページに飛ぶ
        async addList() {
            this.$store.commit('changeLoading', true)
            const listDetails = {
                title: 'タイトル',
                userID: this.$store.state.user.attributes.sub,
                categories: ['カテゴリー']
            }
            const createdList: any = await API.graphql(graphqlOperation(createList, {input: listDetails}))
            
            this.$store.commit('changeCurrentListID', createdList.data.createList.id)
            this.$router.push('List')
        }

        clear() {
            this.dialog = false
            window.localStorage.removeItem('vuex')
        }

        signOut() {
            Auth.signOut().then((data) => {
                return this.$router.push('/')
            }).catch((e) => {
                console.error(e)
            })
        }
    }
</script>

<style scoped>

</style>