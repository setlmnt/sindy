<template>
  <div class="w-screen h-screen flex justify-between overflow-y-hidden">
    <div class="w-full md:w-2/5 h-screen flex flex-col items-center justify-center mx-auto">
      <h1 class="mb-20 font-bold text-5xl hidden md:block">Bem vindo de volta</h1>
      <div :class="errorLogin ? 'border-2 border-error vibrate' : ''" class="mx-auto w-2/3 bg-base-300 rounded-3xl p-8 flex flex-col justify-between">
        <h2 class="text-4xl font-Cairo leading-7 space-y-5">Sin<br>dy.</h2>
        <form class="w-full my-10" @submit.prevent="login">
          <div class="mb-6">
            <label class="label text-xl font-bold" for="username">Usuário</label>
            <input class="input focus:input-primary w-full placeholder-white/25" type="text"
              placeholder="Informe seu usuário" id="username" v-model="username" required />
          </div>
          <div>
            <div class="label">
              <span class="label-text text-xl font-bold">Senha</span>
              <label class="btn btn-ghost w-10 h-10 swap swap-rotate label-text-alt">
                <input type="checkbox" class="theme-controller" value="synthwave" @click="toggleVisibility" />
                <svg class="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" height="24"
                  viewBox="0 -960 960 960" width="24">
                  <path
                    d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Z" />
                </svg>
                <svg class="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                    d="M792-56 624-222q-35 11-71 16.5t-73 5.5q-134 0-245-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q22-39 47-76t58-66L56-792l56-56 736 736-56 56ZM480-320q11 0 21-1t20-4L305-541q-3 10-4 20t-1 21q0 75 52.5 127.5T480-320Zm292 18L645-428q7-17 11-35t4-37q0-75-52.5-127.5T480-680q-19 0-37 4t-35 12L306-766q42-17 85.5-25.5T480-800q134 0 245.5 72.5T900-537q5 8 7.5 17.5T910-500q0 10-2 19.5t-7 17.5q-24 47-55.5 88T772-302ZM587-486 467-606q26-5 50.5 4t41.5 28q17 18 24.5 41t3.5 47Z" />
                </svg>
              </label>
            </div>
            <input
              class="input focus:input-primary w-full placeholder-white/25"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="Informe sua senha"
              id="password"
              v-model="password"
              required
            />
          </div>
        </form>
        <div class="w-full h-10 flex items-center">
          <div class="flex items-center">
            <input class="checkbox checkbox-primary checkbox-sm" type="checkbox" id="remember" />
            <label class="label text-lg" for="remember">Lembrar-me</label>
          </div>
          <a class="ml-auto link link-primary" href="#">Esqueceu a senha?</a>
        </div>
        <button class="btn btn-primary font-bold text-xl mt-8" @click="login">
          <span v-if="!isLoading">Entrar</span>
          <span v-else class="loading loading-spinner loading-md"></span>
        </button>
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
      isLoading: false,
      username: '',
      password: '',
      passwordVisible: false,
      errorLogin: false,
    };
  },
  methods: {
    async login() {
      this.errorLogin = false;
      this.isLoading = true;
      try {
        const response = await loginUser(this.username, this.password);
        console.log('Login successful:', response.token);
        this.$router.push('/');
        this.errorLogin = false;
      } catch (error) {
        console.error('Login error:', error.message);
        this.errorLogin = true;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    toggleVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style>
.vibrate {
      animation: vibrateAnimation 500ms ease-in-out;
    }

    @keyframes vibrateAnimation {
      0%, 100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-10px);
      }
      50% {
        transform: translateX(10px);
      }
      75% {
        transform: translateX(-10px);
      }
    }

</style>