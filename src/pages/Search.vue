<template>
    <div class="w-full px-20 min-h-screen">
        <header class="sticky w-full h-28 pt-6 mb-4 flex items-center z-10 top-0 bg-base-100">
            <Searchbar @search="loadData"></Searchbar>
            <div class="dropdown dropdown-bottom">
                <div class="indicator ml-36">
                    <span class="indicator-item left-2 top-3 badge badge-secondary">9</span>
                    <Button class="btn btn-ghost p-2 rounded-xl">
                        <svg class="fill-current w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            id="notification">
                            <path
                                d="M9.66385809,17.0850308 C10.1612052,17.0997055 10.6494874,17.2209963 11.0952733,17.4405986 L11.0952733,17.4405986 L11.1221123,17.4405986 C11.4945539,17.7444568 11.5578428,18.2868367 11.2652539,18.6673073 C10.7325,19.4297129 9.88007929,19.9104286 8.94815048,19.9740188 C7.99068936,20.0881969 7.02648958,19.8231391 6.26424693,19.2362157 C5.87223416,18.9673952 5.61748007,18.5422722 5.56643201,18.0717313 C5.56643201,17.5739365 6.03164196,17.3428174 6.46106652,17.2450363 C6.96403775,17.1390934 7.47674317,17.0854692 7.99089154,17.0850308 L7.99089154,17.0850308 Z M8.5366186,-1.59872116e-14 C11.632054,-1.59872116e-14 14.8258992,2.24007688 15.156914,5.48463268 C15.2105921,6.15132223 15.156914,6.84467936 15.2105921,7.5202581 C15.3862376,8.39147523 15.7905529,9.20107362 16.3825633,9.86700531 C16.7506233,10.4142844 16.9638305,11.04982 16.9999314,11.7070685 L16.9999314,11.7070685 L16.9999314,11.9115199 C17.0053658,12.7983874 16.6875755,13.6572551 16.1052266,14.3293807 C15.3671354,15.1185689 14.3656784,15.6145192 13.2871279,15.7249841 C10.1005486,16.1338607 6.87427876,16.1338607 3.68769953,15.7249841 C2.59644926,15.6229087 1.58089806,15.1262849 0.833815425,14.3293807 C0.269727524,13.6508093 -0.0260731338,12.7911986 0.00180532602,11.9115199 L0.00180532602,11.7070685 C0.0367179505,11.0522761 0.243355163,10.417938 0.601210451,9.86700531 C1.19585108,9.20045914 1.60588236,8.3917618 1.79107436,7.5202581 C1.84475243,6.84467936 1.79107436,6.16021142 1.84475243,5.48463268 C2.18471354,2.24007688 5.31593434,-1.59872116e-14 8.44715515,-1.59872116e-14 L8.44715515,-1.59872116e-14 Z"
                                transform="translate(3.5 2)"></path>
                        </svg>
                    </Button>
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
            <div></div>
        </header>
        <main class="flex">
            <div v-if="isLoading" class="w-3/5 h-96 mt-12 mr-4 inset-0 bg-opacity-75 flex items-center justify-center">
                <span class="loading loading-spinner loading-lg"></span>
            </div>
            <table v-else class="table-xs lg:table-lg w-3/5 mt-12 mr-4">
                <thead>
                    <tr>
                        <td></td>
                        <th class="text-start">Nome</th>
                        <th class="text-start">CPF</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="person in persons" :key="person.id" @click="showDetails(person)"
                        class="cursor-pointer p-8 border-b-2 border-neutral hover:bg-base-300">
                        <td class="avatar">
                            <div v-if="!photo" class="mask mask-squircle w-20 h-20">
                                <img :src="`data:${photo.contentType};base64,${photo.archiveName}`" alt="Avatar Tailwind CSS Component" />
                            </div>
                            <div v-else class="mask mask-squircle w-16 h-16">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="user"><g data-name="Layer 2"><path fill="#4285f4" d="M13,12.25H11A6.75769,6.75769,0,0,0,4.25,19v1A2.7528,2.7528,0,0,0,7,22.75H17A2.7528,2.7528,0,0,0,19.75,20V19A6.75769,6.75769,0,0,0,13,12.25Z"></path><circle cx="12" cy="6.5" r="5.25" fill="#afcbf9"></circle></g></svg>
                            </div>
                        </td>
                        <td class="">
                            <div class="flex items-center gap-3">
                                <div>
                                    <div class="font-bold text-lg lg:text-xl">{{ person.name }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="font-bold text-lg lg:text-xl w-2/5 lg:w-1/3">
                            {{ formatCPF(person.cpf) }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="previewPerson" class="w-2/5 h-full fixed top-16 right-0 flex items-start justify-center">
                <div class="lg:w-5/6 h-4/5 flex flex-col justify-between mt-16 p-8 bg-base-300 rounded-2xl">
                    <div class="flex h-32 items-center">
                        <div v-if="!photo" class="mask mask-squircle w-32 h-32 avatar mr-8">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Avatar Tailwind CSS Component" />
                        </div>
                        <div v-else class="mask mask-squircle w-28 h-28 avatar mr-8">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="user"><g data-name="Layer 2"><path fill="#4285f4" d="M13,12.25H11A6.75769,6.75769,0,0,0,4.25,19v1A2.7528,2.7528,0,0,0,7,22.75H17A2.7528,2.7528,0,0,0,19.75,20V19A6.75769,6.75769,0,0,0,13,12.25Z"></path><circle cx="12" cy="6.5" r="5.25" fill="#afcbf9"></circle></g></svg>
                        </div>
                        <div>
                            <h1 class="font-bold text-xl lg:text-2xl mb-2">{{ selectedPerson.name }}</h1>
                            <h2 class="text-xl lg:text-2xl opacity-50">{{ formatCPF(selectedPerson.cpf) }}</h2>
                        </div>
                    </div>
                    <div class="mb-2 mt-2">
                        <div class="w-full p-4 flex items-end">
                            <h1 class="text-2xl mr-2">Carteira Sindical: {{ selectedPerson.unionCard }}</h1>
                        </div>
                        <div class="w-full p-4 flex items-end">
                            <h1 class="text-2xl mr-2">Nascimento: {{ formatBirthAt(selectedPerson.birthAt) }}</h1>
                        </div>
                        <div class="w-full p-4 flex items-end">
                            <h1 class="text-2xl mr-2">Celular: {{ selectedPerson.phone }}</h1>
                        </div>
                    </div>
                    <div>
                        <Button class="btn btn-lg btn-primary mr-8" @click="$router.push(`/update/${selectedPerson.id}`)">Expandir</Button>
                        <Button class="btn btn-lg btn-secondary mr-8" @click="$router.push(`/monthly/${selectedPerson.id}`)">Mensalidade</Button>
                    </div>
                </div>
            </div>
            <div v-else class="w-2/5 h-full fixed top-16 right-0 flex items-start justify-center">
                <div class="lg:w-5/6 h-4/5 flex flex-col justify-between mt-16 p-8 bg-base-300 rounded-2xl">
                        <h1 class="font-bold text-xl lg:text-4xl text-center my-auto">selecione uma pessoa</h1>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import Searchbar from '../components/Searchbar.vue';
import Button from '../components/Button.vue';
import { getAllAssociates, getAssociateProfilePictureById } from '../api/associatesApi.ts';

export default {
    name: 'Home',
    components: {
        Searchbar
    },
    data() {
        return {
            isLoading: true,
            persons: [],
            previewPerson: false,
            selectedPerson: {
                id: "",
                name: "",
                unionCard: "",
                cpf: "",
                rg: "",
                profession: "",
                workplace: "",
                phone: "",
                nationality: "Brasil",
                birthAt: "",
                maritalStatus: "",
                associationAt: "",
                localOfficeId: "",
                address: {

                    street: "",
                    city: "",
                    number: "",
                    complement: "",
                    neighborhood: "",
                    zipCode: ""
                },
                dependents: {

                    spouse: "",
                    minorChildren: 0,
                    maleChildren: 0,
                    femaleChildren: 0,
                    otherDependents: 0
                },
                affiliation: {

                    fatherName: "",
                    motherName: ""
                },
                placeOfBirth: {

                    city: "Brumado",
                    state: "BA"
                },
                workRecord: {

                    number: "",
                    series: ""
                },
                isLiterate: true,
                isVoter: true,
            },
            photo: {
                id: "",
                archiveName: "",
                originalName: "",
                contentType: "",
                size: 0,
            },
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        async loadData(searchText = null) {
            try {
                this.isLoading = true;

                let response;

                if (searchText) {
                    response = await getAllAssociates(searchText);
                } else {
                    response = await getAllAssociates();
                }

                this.persons = response.content.map(person => ({
                    id: person.id,
                    name: person.name,
                    cpf: person.cpf,
                    unionCard: person.unionCard,
                    birthAt: person.birthAt,
                    phone: person.phone,
                }));

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                this.isLoading = false;
            }
        },
        formatCPF(cpf) {
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        },
        formatBirthAt(birthAt) {
            const date = birthAt.split('-').reverse().join('');
            return date.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        },
        showDetails(person) {
            this.selectedPerson = person;
            this.previewPerson = true;
        },
    },
}
</script>