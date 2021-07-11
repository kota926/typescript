<template>
    <div>
        <button @click="onClick">My Button</button>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator"
@Component
export default class MyButton extends Vue {
    @Prop()
    public greet?: string;

    public onClick() {
        alert(this.greet)
    }
}
</script>

<style lang="scss" scoped>

</style>