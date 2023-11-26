<template>
    <div class="h-16 flex">
        <input @keyup.enter="search" v-model="searchText" type="text" placeholder="Buscar" class="input h-full input-bordered w-72 max-w-xs rounded-xl mr-2" />
        <Button @click="search" class="btn btn-primary h-full rounded-xl">
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search" style="width: 24px; height: 24px;">
                <g data-name="Layer 2">
                    <path
                        d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
                        data-name="search"></path>
                </g>
            </svg>
        </Button>
    </div>
</template>
<script>
import Button from './Button.vue';
export default {
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    search() {
      this.$emit("search", this.searchText);
    },
  },
};
</script>