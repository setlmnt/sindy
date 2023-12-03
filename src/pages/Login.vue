<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
  
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
  
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { loginUser } from '../api/authApi.ts';
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await loginUser(this.username, this.password);
          console.log('Login successful:', response.token);
          this.$router.push('/home');
        } catch (error) {
          console.error('Login error:', error.message);
        }
      },
    },
  };
  </script>