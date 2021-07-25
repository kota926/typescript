<template>
<div>
    <v-system-bar
        color="grey darken-4"
        dark
        ></v-system-bar>

        <v-app-bar
        dark
        color="blue-grey darken-4"
        min-height="60"
        >
            <v-toolbar-title class="ml-sm-10 d-flex">
                <div class="mr-4">
                    カスタム英文帳
                </div>
                <div>
                    ログイン
                </div>
            </v-toolbar-title>
            <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
                color="cyan"
            ></v-progress-linear>
        </v-app-bar>
    <v-container>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="form mt-10"
        >
            <v-text-field
            v-model="userName"
            :rules="nameRules"
            label="ユーザーネーム"
            required
            outlined
            ></v-text-field>

            <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules='passwordRules'
            :type="show ? 'text' : 'password'"
            name="パスワード"
            hint="半角英数字"
            label="パスワード"
            counter
            outlined
            required
            @click:append="show = !show"
            ></v-text-field>
            <div class="d-flex justify-center ma-10">
                <v-btn
                :disabled="!valid"
                color="success"
                class=""
                outlined
                @click="signIn"
                >
                ログイン
                </v-btn>
            </div>
            <div class="d-flex justify-center ma-10">
                <v-btn
                color="primary"
                @click="signUp"
                outlined
                >
                初めての方はこちら
                </v-btn>
            </div>
        </v-form>
        <v-dialog
            v-model="dialog"
            persistent
        >
        <v-card max-width="450" class="mx-auto">
            <v-card-title>
                ログインできませんでした
            </v-card-title>
            <v-card-text>
                {{ message }}
            </v-card-text>
            <div class="d-flex justify-end">
                <v-card-actions>
                    <v-btn
                    color="primary"
                    class="mb-3 mr-4"
                    outlined
                    @click="gotIt"
                    >OK</v-btn>
                </v-card-actions>
            </div>
        </v-card>
        </v-dialog>
    </v-container>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Auth } from 'aws-amplify'

@Component
export default class SignIn extends Vue {
    password = ""
    userName = ""
    valid = true
    show = false
    loading = false
    dialog = false
    message = ""
    nameRules = [
        (v: string): boolean | string => !!v || 'ユーザーネームは必須です'
    ]
    passwordRules = [
        (v: string): boolean | string => !!v || 'パスワードは必須です',
        (v: string): boolean | string => v.length >= 8 || '8文字以上が必要です',
    ]
    public signIn() {
        this.loading = true
        Auth.signIn(this.userName, this.password).then((user) => {
            console.log(user)
            this.loading = false
            return this.$router.push('Home')
        }).catch((error) => {
            console.error(error)
            this.loading = false
            switch(error.code){
                case 'UserNotConfirmedException':
                    this.message = 'アカウントが認証されていません。'
                    break
                case 'PasswordResetRequiredException':
                    this.message = 'パスワードをリセットしてください。'
                    break
                case 'NotAuthorizedException':
                    this.message = 'パスワードが違います。'
                    break
                case 'UserNotFoundException':
                    this.message = 'そのユーザは作成されていません。'
                    break
                case 'InvalidParameterException':
                    this.message = '入力された情報の処理に失敗しました。'
                    break
                default:
                    this.message = '予期せぬエラーが発生しました。もう一度やり直してください。'
            }
            this.dialog = true
        })
    }
    
    public signUp() {
        this.$router.push('SignUp')
    }

    public gotIt() {
        this.dialog = false
    }
}
</script>

<style scoped>
.form {
    max-width: 500px;
    margin: 0 auto;
}
</style>