<template>
  <div v-html="content">
    
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {  useRoute } from 'vue-router';
let route = useRoute();
let content=ref(route.params.content)
</script>

<style scope>

</style>