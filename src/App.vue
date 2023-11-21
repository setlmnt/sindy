<template>
  <div :data-theme="currentTheme" class="flex">
    <Navbar @theme-toggle="toggleTheme" />
    <router-view class="ml-24"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {
      currentTheme: 'dark'
    };
  },
  methods: {
    toggleTheme() {
      // Alterna entre 'dark' e 'light' (ou outros temas que você tenha)
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    }
  }
}
</script>
