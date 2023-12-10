<template>
  <div :data-theme="currentTheme" class="flex">
    <Navbar v-if="this.$route.path !== '/register' && this.$route.path !== '/login'" @theme-toggle="toggleTheme" />
    <router-view :class="this.$route.path !== '/login' ? 'ml-24' : ''"></router-view>
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
