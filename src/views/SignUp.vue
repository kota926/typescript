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
                    ユーザー作成
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
            v-show="signUpForm"
        >
            <v-text-field
            v-model="userName"
            :rules="nameRules"
            label="ユーザーネーム"
            required
            outlined
            ></v-text-field>

            <v-text-field
            v-model="email"
            :rules="emailRules"
            label="メールアドレス"
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
            @click:append="show = !show"
            ></v-text-field>
            <div class="d-flex justify-center ma-10">
                <v-btn
                :disabled="!valid"
                color="success"
                class=""
                @click="signUp"
                outlined
                >
                ユーザー作成
                </v-btn>
            </div>
        </v-form>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="form mt-10"
            v-show="!signUpForm"
        >
            <v-text-field
            v-model="userName"
            :rules="nameRules"
            label="ユーザーネーム"
            required
            outlined
            disabled
            ></v-text-field>

            <v-text-field
            v-model="email"
            :rules="emailRules"
            label="メールアドレス"
            required
            outlined
            disabled
            ></v-text-field>

            <v-text-field
            v-model="verifyCode"
            label="認証コード"
            required
            outlined
            ></v-text-field>

            <div class="d-flex justify-center ma-10">
                <v-btn
                :disabled="!valid"
                color="success"
                class=""
                @click="userVerify"
                outlined
                >
                認証
                </v-btn>
            </div>
            <div class="d-flex justify-center ma-10">
                <v-btn
                color="blue-gray"
                class=""
                @click="resend"
                outlined
                >
                コードを再発行
                </v-btn>
            </div>
        </v-form>
        <div class="d-flex justify-center">
            <v-btn
            color="info"
            @click="toSignIn"
            outlined
            >
            ログインページへ戻る
            </v-btn>
        </div>
        <v-dialog
            v-model="confirmDialog"
            persistent
        >
        <v-card max-width="500" class="mx-auto">
            <v-card-title>
                認証
            </v-card-title>
            <v-card-text>
                ご登録いただいたメールアドレスに認証用コードをお送りしました。お次のページにてコードを入力し、認証を完了してください。
            </v-card-text>
        </v-card>
        </v-dialog>
        <v-dialog
            v-model="reconfirmDialog"
            persistent
        >
        <v-card max-width="500" class="mx-auto">
            <v-card-title>
                再認証
            </v-card-title>
            <v-card-text>
                ご登録いただいたメールアドレスに認証用コードを再度お送りしました。
            </v-card-text>
        </v-card>
        </v-dialog>
        <v-dialog
            v-model="completeDialog"
            persistent
        >
        <v-card max-width="300" class="mx-auto">
            <v-card-title>
                認証完了
            </v-card-title>
            <v-card-text>
                認証が完了しました。
            </v-card-text>
        </v-card>
        </v-dialog>
        <v-dialog
            v-model="failDialog"
            persistent
        >
        <v-card max-width="450" class="mx-auto">
            <v-card-title>
                {{ title }}
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
        <v-dialog
            v-model="warnDialog"
            persistent
        >
        <v-card max-width="450" class="mx-auto">
            <v-card-title>
                警告
            </v-card-title>
            <v-card-text>
                認証前にこのページを離れた場合、現在作成しているアカウントはご利用できません。認証を行わずにログインページに戻りますか？
            </v-card-text>
            <div class="d-flex justify-end">
                <v-card-actions>
                    <v-btn
                    color="primary"
                    class="mb-3 mr-4"
                    outlined
                    @click="warnDialog = false"
                    >NO</v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-btn
                    color="danger"
                    class="mb-3 mr-4"
                    outlined
                    @click="getOut"
                    >YES</v-btn>
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
export default class SignUp extends Vue {
    password = ""
    userName = ""
    email = ""
    valid = true
    show = false
    signUpForm = true
    verifyCode = ""
    confirmDialog  = false
    reconfirmDialog = false
    completeDialog = false
    failDialog = false
    warnDialog = false
    title = 'ユーザーを作成できませんでした'
    message = ""
    loading = false
    nameRules = [
        (v: string): boolean | string => !!v || 'ユーザーネームは必須です'
    ]
    emailRules = [
        (v: string): boolean | string => !!v || 'メールアドレスは必須です',
        (v: string): boolean | string => /.+@.+\..+/.test(v) || '有効なメールアドレスを記入してください',
    ]
    passwordRules = [
        (v: string): boolean | string => !!v || 'パスワードは必須です',
        (v: string): boolean | string => v.length >= 8 || '8文字以上が必要です',
    ]
    public signUp() {
        this.loading = true
        Auth.signUp(this.userName, this.password, this.email).then((user) => {
            console.log(user)
            this.loading = false
            this.confirmDialog = true
            setTimeout(() => {
                this.confirmDialog = false
                this.signUpForm = false
            }, 8000)
        }).catch((error) => {
            console.error(error)
            this.loading = false
            this.title = 'ユーザーを作成できませんでした'
            switch(error.code) {
                case 'UsernameExistsException' :
                    this.message = "そのユーザーネームはすでに使用されています。"
                    break
                case 'InvalidParameterException' :
                    this.message ='不適な入力を検出しました。'
                    break
                case 'InvalidPasswordException' :
                    this.message = 'パスワードを変更してください。'
                    break
                default:
                    this.message = '予期せぬエラーが発生しました。もう一度やりなおしてください。'
            }
            this.failDialog = true
        })
    }

    public userVerify() {
        this.loading = true
        const trimedCode = this.verifyCode.trim()
        Auth.confirmSignUp(this.userName, trimedCode).then((data) => {
            this.loading = false
            this.completeDialog = true
            setTimeout(() => {
                this.completeDialog = false
                this.$router.push('/')
            }, 4000)
        }).catch((error) => {
            console.error(error)
            this.title = '認証に失敗しました'
            switch(error.code) {
                case 'CodeMismatchException' :
                    this.message = "無効なコードが入力されました。"
                    break
                case 'LimitExceededException' :
                    this.message = 'コード入力回数の上限に達しました。'
                    break
                case 'ExpiredCodeException' :
                    this.message = 'コードの生成から２４時間が経過し、期限が切れました。'
                    break
                case 'NotAuthorizedException' :
                    this.message = 'あなたのアカウントはすでに認証されています。'
                    break
                case 'CodeDeliveryFailureException' :
                    this.message = '認証コードに送信に失敗しました。'
                    break
                case 'InvalidParameterException':
                    this.message = '不適なコードが入力されました。'
                    break
                default:
                    this.message = '予期せぬエラーが発生しました。もう一度やりなおしてください。'
            }
            this.failDialog = true
            this.loading = false
        })
    }

    public resend() {
        Auth.resendSignUp(this.userName).then((result) => {
            console.log(result)
            this.reconfirmDialog = true
            setTimeout(() => {
                this.reconfirmDialog = false
            }, 8000)
        }).catch((error) => {
            switch(error.code) {
                case 'CodeDeliveryFailureException': 
                    this.message = 'コードの送信に失敗しました。'
                    break
                default:
                    this.message = '予期せぬエラーが発生しました。もう一度やり直してください。'
            }
            this.title = 'コードの再発行ができませんでした'
            this.failDialog = true
        })
        
    }

    toSignIn() {
        if(this.signUpForm === true) {
            this.$router.push('/')
        } else {
            this.warnDialog = true
        }
        
    }

    getOut() {
        this.$router.push('/')
    }

    gotIt () {
        this.failDialog = false
    }

}
</script>

<style scoped>
.form {
    max-width: 500px;
    margin: 0 auto;
}
</style>