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
                    <v-toolbar-title class="mx-3">タイトル</v-toolbar-title>
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
                                @click="dialog = false"
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

    @Component
    export default class ListNav extends Vue {
        dialog = false
        categoryName = ""
        deletedCategory = ""
        categories = ["カテゴリー"]
        selectedCategories: string[] = []
        titleName = ""
        currentInfo = {}

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

        toHome() {
            this.$router.push('/home')
        }
        toTest() {
            this.$router.push('Test')
        }
        toArrange() {
            this.$router.push('Arrange')
        }
        toTranscribe() {
            this.$router.push('Transcribe')
        }
    }
</script>

<style scoped>

</style>