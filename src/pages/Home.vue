<template>
    <div class="p-20 w-full min-h-screen">
        <header class="w-full h-8">
            <h1 class="font-bold text-5xl">Visão Geral</h1>
        </header>
        <main class="w-2/3 flex justify-between mt-20">
            <div class="card w-1/3 mr-4 bg-primary text-primary-content">
                <div class="card-body">
                    <h2 class="card-title">Total de Associados Cadastrados</h2>
                    <p class="font-bold text-4xl">{{ this.totalPersons }}</p>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import { getAllAssociates, getAllBirthdayAssociates } from '../api/associatesApi.ts';

export default {
    data() {
        return {
            isLoading: true,
            totalPersons:'',
            birthdayAssociates: [],
        };
    },
    mounted() {
        this.loadData();
        this.loadBirthdayAssociates();
    },
    methods: {
        async loadData() {
               const response = await getAllAssociates();
                this.totalPersons = response.totalElements;
        },
        async loadBirthdayAssociates() {
            const response = await getAllBirthdayAssociates();
            this.birthdayAssociates = response.content;
        },
    }
}
</script>