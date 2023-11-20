<template>
  <div data-theme="dim" class="flex">
    <Navbar />
    <router-view></router-view>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

  
