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
                                    
                                >
                                    詳細
                                </v-btn>
                                <v-btn
                                    outlined
                                    color="red"
                                    class="ml-8 ml-sm-3"
                                    
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
                                    
                                >
                                    空欄補充
                                </v-btn>
                                <v-btn
                                    outlined
                                    color="indigo"
                                    class="mx-sm-3"
                                    
                                >
                                    並べ替え
                                </v-btn>
                                <v-btn
                                    outlined
                                    color="indigo"
                                   
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

    @Component
    export default class ListTable extends Vue {
        dialog = false
        lists = [
            {
                id: "1",
                title: "サンプル",
                categories: ["重要単語"],
            }   
        ]

        toggleBtn() {
            if(this.dialog) {
                this.dialog = false
            } else {
                this.dialog = true
            }
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