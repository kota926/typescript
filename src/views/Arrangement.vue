<template>
    <div>
        <test-nav />
        <arrange />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Arrange from '../components/Arrange.vue'
    import TestNav from '../components/TestNav.vue'

    @Component({
        components: {
            'arrange': Arrange,
            'test-nav': TestNav
        }
    })
    export default class Arrangement extends Vue {
        
    }
</script>

<style scoped>

</style>