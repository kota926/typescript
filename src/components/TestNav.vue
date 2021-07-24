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
                                class="ma-2"
                                outlined
                                fab
                                color="gray"
                                v-bind="attrs"
                                v-on="on"
                                @click="passConfig"
                                small
                            >
                                <v-icon>mdi-wrench</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="text-h5">設定</span>
                            </v-card-title>
                            <v-card-text>
                            <v-container>
                                <v-subheader class="pl-0">
                                    解説表示時間 (×0.1 s)
                                </v-subheader>
                                <v-slider
                                v-model="time"
                                thumb-label
                                max="100"
                                min="0"
                                ></v-slider>
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
                                @click="saveConfig"
                            >
                                保存
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </template>
                </v-col>
            </v-row>
        </v-app-bar>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { API, graphqlOperation } from 'aws-amplify'
    import { getList } from '../graphql/queries'

    @Component
    export default class TestNav extends Vue {
        dialog = false
        list = {}
        time = 40

        created() {
            const list: any = API.graphql(graphqlOperation(getList, {id: this.$store.state.currentListID}))
            list.then((result) => {
                console.log(result)
                this.list = result.data.getList
            })
        }
        
        get responsiveBack() {
            if(document.documentElement.clientWidth < 450) {
                return ''
            } else {
                return 'Back'
            }
        }

        toHome() {
            this.$store.commit('resetIndex')
            this.$router.push('/home')
        }
        
        passConfig() {
            this.time = this.$store.state.time
        }
        saveConfig() {
            this.dialog = false
            const config = {
                time: this.time,
            }
            this.$store.commit('saveConfig', config)
        }
    }
</script>

<style scoped>

</style>