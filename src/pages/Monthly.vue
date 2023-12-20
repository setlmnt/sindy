<template>
    <div class="w-full p-20 min-h-screen">
        <header class="w-full h-8">
            <h1 class="font-bold text-5xl">Historico De Pagamento</h1>
        </header>
        <main class="flex">
            <div v-if="isLoading" class="w-3/5 h-96 mt-12 mr-4 inset-0 bg-opacity-75 flex items-center justify-center">
                <span class="loading loading-spinner loading-lg"></span>
            </div>
            <table v-else class="table-xs lg:table-lg w-full mt-12 mr-4">
                <thead>
                    <tr>
                        <th class="text-start">Nome</th>
                        <th class="text-start">Periodo</th>
                        <th class="text-start">Valor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="monthlyFee in monthlyFees" :key="monthlyFee.id" @click="showDetails(monthlyFee)"
                        class="cursor-pointer p-8 border-b-2 border-neutral hover:bg-base-300">
                        <td class="font-bold text-lg lg:text-xl w-2/5 lg:w-1/3">
                            <div class="font-bold text-lg lg:text-xl">{{ monthlyFee.associate.name }}</div>
                        </td>
                        <td class="font-bold text-lg lg:text-xl w-2/5 lg:w-1/3">
                            {{ formatDate(monthlyFee.initialDate) }} - {{ formatDate(monthlyFee.finalDate) }}
                        </td>
                        <td class="font-bold text-lg lg:text-xl w-2/5 lg:w-1/3">
                            {{ formatCurrency(monthlyFee.feeValue) }}
                        </td>
                        <td class="w-1/5 lg:w-1/3">
                            <Button class="btn btn-primary" @click="exportPdf">Exportar</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>
</template>
  
<script>
import Searchbar from '../components/Searchbar.vue';
import Button from '../components/Button.vue';
import { getAllMonthlyFees, exportMonthlyFeeToPdf } from '../api/monthlyFeesApi.ts';

export default {
    name: 'Home',
    components: {
        Searchbar,
    },
    data() {
        return {
            isLoading: true,
            monthlyFees: [],
            previewmonthlyFee: false,
            selectedMonthlyFee: {},
            photo: {
                id: '',
                archiveName: '',
                originalName: '',
                contentType: '',
                size: 0,
            },
        };
    },
    mounted() {
        this.fetchMonthlyFees();
    },
    methods: {
        async fetchMonthlyFees() {
            try {
                const response = await getAllMonthlyFees();
                this.monthlyFees = response.content;
                console.log(response.content);
            } catch (error) {
                console.error('Erro ao buscar taxas mensais:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async exportPdf() {
            try {
                const response = await exportMonthlyFeeToPdf(this.selectedMonthlyFee.id);
                console.log(response);
            } catch (error) {
                console.error('Erro ao exportar taxa mensal:', error);
            }
        },
        showDetails(monthlyFee) {
            this.selectedMonthlyFee = monthlyFee;
            this.previewmonthlyFee = true;
        },
        formatDate(dateString) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('pt-BR', options);
        },
        formatCurrency(value) {
            const options = { style: 'currency', currency: 'BRL' }; // Adjust currency as needed
            return new Number(value).toLocaleString('pt-BR', options);
        },
    },
};
</script>
  