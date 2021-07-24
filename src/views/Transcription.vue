<template>
    <div>
        <test-nav />
        <transcribe />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Transcribe from '../components/Transcribe.vue'
    import TestNav from '../components/TestNav.vue'

    @Component({
        components: {
            'transcribe': Transcribe,
            'test-nav': TestNav
        }
    })
    export default class Transcription extends Vue {
        
    }
</script>

<style scoped>

</style>