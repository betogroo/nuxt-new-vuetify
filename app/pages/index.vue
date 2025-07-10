<script setup lang="ts">
  definePageMeta({
    name: 'Home Page',
  })
  const { title, setTitle } = useTitle()
  setTitle('Home Page Vuetify')
</script>
<template>
  <div class="container">
    <h1 class="text-h5">{{ title }}</h1>
  </div>
</template>
