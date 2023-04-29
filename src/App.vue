<template>
      <div id="app">
          <TheHeader />
          <div class="container">
            <TheNav />
            <TheContent />
          </div>
      </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import TheNav from './components/layout/TheNav.vue'
import TheContent from './components/layout/TheContent.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheNav,
    TheContent,
  }
}
</script>

<style>
@import url(./css/main.css);
</style>
