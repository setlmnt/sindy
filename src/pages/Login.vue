<template>
  <div class="w-screen h-screen flex justify-between overflow-y-hidden">
    <div class="w-full md:w-2/5 h-screen flex flex-col items-center justify-center mx-auto">
      <h1 class="mb-20 font-bold text-5xl hidden md:block">Bem vindo de volta</h1>
      <div class="mx-auto w-2/3 bg-base-300 rounded-3xl p-8 flex flex-col justify-between">
        <h2 class="text-4xl font-Cairo leading-7 space-y-5">Sin<br>dy.</h2>
        <form class="w-full my-10" @submit.prevent="login">
          <div class="mb-6">
            <label class="label text-xl font-bold" for="username">Usuário</label>
            <input class="input focus:input-primary w-full placeholder-white/25" type="text" placeholder="Informe seu usuário" id="username" v-model="username" required />
          </div>
          <div>
            <label class="label text-xl font-bold" for="password">Senha</label>
            <input class="input focus:input-primary w-full placeholder-white/25" type="password" placeholder="Informe sua senha" id="password" v-model="password" required />
          </div>
        </form>
        <div class="w-full h-10 flex items-center">
          <div class="flex items-center">
            <input class="checkbox checkbox-primary checkbox-sm" type="checkbox" id="remember" />
            <label class="label text-lg" for="remember">Lembrar-me</label>
          </div>
          <a class="ml-auto link link-primary" href="#">Esqueceu a senha?</a>
        </div>
        <button class="btn btn-primary font-bold text-xl mt-8" type="submit">Entrar</button>
      </div>
      <span class="flex mt-8 font-bold">
        <p class="mr-2">Ainda não possui uma conta?</p>
        <a class="ml-auto text-primary" href="/register">Registre-se</a>
      </span>
      <p class="absolute bottom-8 left-8 font-bold text-white/30"> © {{ new Date().getFullYear() }} Setlmnt, Coletive.</p>
    </div>
    <img class="h-screen hidden md:block" src="../assets/imgs/backgrounds/login.svg" alt="">
  </div>
</template>
  
<script>
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