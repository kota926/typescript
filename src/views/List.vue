<template>
    <list-nav>
        <resister />
        <word-table />
    </list-nav>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import ListNav from '../components/ListNav.vue'
    import Resister from "../components/Resister.vue"
    import WordTable from '../components/WordTable.vue'

    @Component({
        components: {
            "list-nav": ListNav,
            "resister": Resister,
            "word-table": WordTable
        }
    })
    export default class List extends Vue {
        
    }
</script>

<style scoped>

</style>