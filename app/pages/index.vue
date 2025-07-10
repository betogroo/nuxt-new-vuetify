<script setup lang="ts">
  definePageMeta({
    name: 'Home Page',
  })
  const { title, setTitle } = useTitle()
  setTitle('Home Page Vuetify')
</script>
<template>
  <div class="d-flex flex-column align-center">
    <h1 class="text-h5">{{ title }}</h1>
    <v-btn class="ma-2" width="fit-content" @click="console.log('Botão')"
      >Button</v-btn
    >
  </div>
</template>
