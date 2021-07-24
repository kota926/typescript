<template>
    <div>
        <test-nav />
        <fill-blank />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import FillBlank from '../components/FillBlank.vue'
    import TestNav from '../components/TestNav.vue'

    @Component({
        components: {
            'fill-blank': FillBlank,
            'test-nav': TestNav
        }
    })
    export default class Blank extends Vue {
        
    }
</script>

<style scoped>

</style>