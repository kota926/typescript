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
            <v-toolbar-title
                class="ml-sm-10">カスタム英文帳
            </v-toolbar-title>
        </v-app-bar>
    <v-container>
        <amplify-authenticator></amplify-authenticator>
    </v-container>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SignIn extends Vue {
    
}
</script>

<style scoped>

</style>