<!-- Button.vue -->
<template>
    <button class="btn sm:btn-sm md:btn-md lg:btn-lg" @click="handleClick">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    methods: {
      handleClick() {
        this.$emit('click');
      }
    }
  };
  </script>
  