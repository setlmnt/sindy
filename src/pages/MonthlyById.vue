<template>
    <div class="w-full h-screen flex items-center justify-center">
        <div v-if="!isSave" :class="errorSave ? 'border-2 border-error vibrate' : ''" class="w-1/2 h-3/4 p-8 rounded-3xl bg-base-300 flex flex-col justify-between">
            <div class="flex h-32 items-center">
                <div v-if="photo" class="mask mask-squircle w-32 h-32 avatar mr-8">

                </div>
                <div v-else class="mask mask-squircle w-28 h-28 avatar mr-8">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="user">
                        <g data-name="Layer 2">
                            <path fill="#4285f4"
                                d="M13,12.25H11A6.75769,6.75769,0,0,0,4.25,19v1A2.7528,2.7528,0,0,0,7,22.75H17A2.7528,2.7528,0,0,0,19.75,20V19A6.75769,6.75769,0,0,0,13,12.25Z">
                            </path>
                            <circle cx="12" cy="6.5" r="5.25" fill="#afcbf9"></circle>
                        </g>
                    </svg>
                </div>
                <div>
                    <h1 class="font-bold text-xl lg:text-2xl mb-2">{{ this.associate.name }}</h1>
                    <h2 class="text-xl lg:text-2xl opacity-50">{{ this.associate.cpf }}</h2>
                </div>
            </div>
            <div>
                <div class="w-full my-4">
                    <div class="w-full flex justify-center">
                        <div class="w-1/2 mr-8">
                            <div class="label">
                                <span class="label-text">Total</span>
                            </div>
                            <div class="relative rounded-md shadow-sm">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">R$</span>
                                <input v-model="monthlyFee.feeValue" class="input pl-10 pr-4 py-2 rounded-md w-full"
                                    type="text" @input="mascaraValor('feeValue')">
                            </div>
                        </div>
                        <div class="w-1/2">
                            <div class="label">
                                <span class="label-text">Valor da Matricula</span>
                            </div>
                            <div class="relative rounded-md shadow-sm">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">R$</span>
                                <input v-model="monthlyFee.registrationValue" class="input pl-10 pr-4 py-2 rounded-md w-full"
                                    type="text" @input="mascaraValor('registrationValue')">
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex justify-center">
                        <div class="w-1/2 mr-8">
                            <div class="label">
                                <span class="label-text">Ultima mensalidade paga:</span>
                            </div>
                            <input class="input w-full" v-model="monthlyFee.initialDate" type="date">
                        </div>
                        <div class="w-1/2">
                            <div class="label">
                                <span class="label-text">Pagar mensalidade até o mês:</span>
                            </div>
                            <input class="input w-full" v-model="monthlyFee.finalDate" type="date">
                        </div>
                    </div>
                </div>
                <VCalendar class="!bg-base-100 !border-none !text-current" :is-dark="teme" expanded v-model="date" timezone="UTC" :attributes="attributes" />
            </div>
            <button class="btn btn-primary font-bold text-2xl mt-8" @click="saveMonthlyFee">
          <span v-if="!isLoading">Salvar</span>
          <span v-else class="loading loading-spinner loading-md"></span>
        </button>
        </div>
        <div v-else class="w-1/2 h-3/4 p-8 rounded-3xl bg-base-300 flex flex-col justify-between border-2 border-success">
            <h1 class="font-bold text-2xl lg:text-4xl my-auto text-center text-success">Mensalidade salva com sucesso!</h1>
        </div>
    </div>
</template>
<script>
import { getAllMonthlyFeesByAssociateId, saveMonthlyFee } from '../api/monthlyFeesApi.ts';
import { getAssociateById } from '../api/associatesApi.ts';
import { ref, watch } from 'vue';
export default {
    props: {
    currentTheme: String,
  },
    data() {
        return {
            isLoading: false,
            isSave: false,
            errorSave: false,
            photo: false,
            teme: this.currentTheme === 'dark' ? true : false,
            person: {
                name: '',
                cpf: ''
            },
            associate: {
                name: '',
                cpf: ''
            },
            monthlyFee: {
                feeValue: '',
                registrationValue: '',
                initialDate: '',
                finalDate: '',
                associateId: this.$route.params.id,
            },
            date: new Date().toISOString().substr(0, 10),
        }
    },
    watch: {
        'monthlyFee.feeValue': {
            handler(newValue) {
                this.monthlyFee.feeValue = this.mascaraValor(newValue);
            },
            deep: true,
        },
        'monthlyFee.registrationValue': {
            handler(newValue) {
                this.monthlyFee.registrationValue = this.mascaraValor(newValue);
            },
            deep: true,
        },
        'monthlyFee.initialDate': {
            handler(newValue) {
                this.updateDateRange();
            },
            deep: true,
        },
        'monthlyFee.finalDate': {
            handler(newValue) {
                this.updateDateRange();
            },
            deep: true,
        },
    },
    methods: {
         // formatar datas para formato brasileiro
        async getPerson(id) {
            try {
                const response = await getAllMonthlyFeesByAssociateId(id);
                // pegar a data final da ultima mensalidade existente no array cadastrada e setar como data inicial da nova mensalidade

                if (response.content.length > 0) {
                    const lastMonthlyFee = response.content[response.content.length - 1];
                    this.monthlyFee.initialDate = lastMonthlyFee.finalDate;
                }
            } catch (error) {
                console.error('Monthly fee error:', error.message);
            }
        },
        async getAssociateById(id) {
            try {
                const response = await getAssociateById(id);
                this.associate = response;
            } catch (error) {
                console.error('Monthly fee error:', error.message);
            }
        },
        async saveMonthlyFee() {
            this.errorSave = false;
            this.isLoading = true;
            try {
                const monthlyFeeCopy = { ...this.monthlyFee };
                monthlyFeeCopy.feeValue = monthlyFeeCopy.feeValue.replace(/\./g, '').replace(',', '.');
                monthlyFeeCopy.registrationValue = monthlyFeeCopy.registrationValue.replace(/\./g, '').replace(',', '.');
                const response = await saveMonthlyFee(monthlyFeeCopy);
                this.getPerson(this.$route.params.id);
                console.log('Monthly fee successful:', response.data);
                this.isSave = true;
                setTimeout(() => {
                    this.$router.push('/monthly');
                }, 2000);
            } catch (error) {
                console.error('Monthly fee error:', error.message);
                this.errorSave = true;
                this.isLoading = false;
            }
        },
        updateDateRange() {
            const startDate = this.monthlyFee.initialDate;
            const endDate = this.monthlyFee.finalDate;

            if (startDate && endDate) {
                this.attributes = [
                    {
                        highlight: 'blue',
                        dates: { start: new Date(startDate), end: new Date(endDate) },
                    },
                ];
            } else {
                this.attributes = [];
            }
        },
        formatCPF(cpf) {
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        },
        mascaraValor(value) {
            return value.replace(/\D/g, '')
                .replace(/(\d{1})(\d{14})$/, '$1.$2')
                .replace(/(\d{1})(\d{11})$/, '$1.$2')
                .replace(/(\d{1})(\d{8})$/, '$1.$2')
                .replace(/(\d{1})(\d{5})$/, '$1.$2')
                .replace(/(\d{1})(\d{1,2})$/, '$1,$2');
        },

    },
    mounted() {
        const id = this.$route.params.id;
        this.getAssociateById(id);
        this.getPerson(id);
    }
}
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