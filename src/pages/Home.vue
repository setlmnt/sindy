<template>
    <div class="w-full p-8">
        <header>
            <Searchbar />
        </header>
        <main>
            <table class="table-lg w-1/2 mt-12">
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
                    <tr @click="" class="hover:bg-neutral cursor-pointer">
                        <td class="avatar">
                            <div class="mask mask-squircle w-20 h-20">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Avatar Tailwind CSS Component" />
                            </div>
                        </td>
                        <td>
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
        </main>
    </div>
</template>
<script>
import Searchbar from '../components/Searchbar.vue';
export default {
    components: {
        Searchbar
    }
}
</script>