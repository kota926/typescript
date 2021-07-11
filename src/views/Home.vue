<template>
  <home-nav>
    <list-table />
  </home-nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeNav from '../components/HomeNav.vue';
import ListTable from '../components/ListTable.vue'

@Component({
  components: {
    'home-nav': HomeNav,
    'list-table': ListTable
  }
})
export default class Home extends Vue {
    
}
</script>
