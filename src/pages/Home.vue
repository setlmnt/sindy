<template>
    <div class="w-full px-20">
        <header class="fixed w-full h-28 pb-2 flex items-end z-10 top-0 bg-base-100">
            <Search></Search>
        </header>
        <main class="mt-32 flex">
            <table class="table-xs lg:table-md w-1/2 mt-12">
                <!-- head -->
                <thead>
                    <tr>
                        <td></td>
                        <th class="text-start">Nome</th>
                        <th class="text-start">CPF</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="index in 100" :key="index" @click="" class="cursor-pointer p-8 border-b-2 border-neutral hover:bg-base-300">
                        <td class="avatar">
                            <div class="mask mask-squircle w-20 h-20">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Avatar Tailwind CSS Component" />
                            </div>
                        </td>
                        <td class="">
                            <div class="flex items-center gap-3">
                                <div>
                                    <div class="font-bold text-2xl">Hart Hagerty</div>
                                    <div class="text-sm opacity-50">United States</div>
                                </div>
                            </div>
                        </td>
                        <td class="font-bold text-2xl">
                            115.344.343-54
                        </td>
                    </tr>
                    
                    
                </tbody>
            </table>
            <div class="w-1/2 h-full fixed top-0 right-0 flex items-center justify-center">
                <div class="w-5/6 h-5/6 mt-16 bg-base-300 rounded-2xl">
                    <img src="" alt="">
                    <h1></h1>
                    
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import Search from '../components/Search.vue';
export default {
    name: 'Home',
    components: {
        Search
    }
}
</script>