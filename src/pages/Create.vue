<template>
    <div class="w-full ">
        <h1 class="ml-40 mt-12 mb-12 text-5xl">Cadastrar novo associado</h1>
        <form @keydown="validarCampo" class="w-3/4  mx-auto  border-2 border-secondary rounded-2xl p-8"
            @submit.prevent="submitForm">
            <div class="w-full flex">
                <div class="w-1/2 mr-4">
                    <div class="flex w-full h-2/5">

                        <div ref="dropArea"
                            class="border-2 border-dashed border-accent p-8 mr-4 w-64 text-center cursor-pointer relative"
                            @dragover.prevent @dragenter="addDragOverClass" @dragleave="removeDragOverClass"
                            @drop="handleDrop">
                            <span class="block mb-4">Arraste e solte ou:</span>
                            <button @click="openFileInput" class="btn btn-primary w-full">Escolher Arquivo</button>
                            <button @click="openCamera" class="btn btn-secondary w-full mt-2">Abrir Câmera</button>

                            <!-- Exibir a imagem da câmera ou arquivo selecionado -->
                            <div v-if="isCameraActive || selectedImage" class="absolute top-0 left-0 w-full h-full">
                                <img v-if="selectedImage" :src="selectedImage" alt="Imagem Selecionada"
                                    class="w-full h-full object-cover" />
                                <video v-if="isCameraActive" ref="cameraFeed" width="100%" height="100%" autoplay></video>
                                <Button @click="captureFromCamera, clearSelection" v-if="isCameraActive">Capturar</Button>
                            </div>
                            <input type="hidden" name="imagem" :value="selectedImage" />
                        </div>

                        <div class="w-full h-full flex flex-col justify-end">
                            <div>
                                <label class="label">
                                    <span class="label-text">Nome</span>
                                </label>
                                <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.nome"
                                    required />
                            </div>
                            <div class="flex w-full">
                                <div class="w-full mr-4">
                                    <label class="label">
                                        <span class="label-text">Estado Civil</span>
                                    </label>
                                    <select class="select select-bordered w-full  rounded-xl" type="text"
                                        v-model="form.estadoCivil" required>
                                        <option value="opcion1">solteiro</option>
                                        <option value="opcion2">casado</option>
                                        <option value="opcion3">divorciado</option>
                                        <option value="opcion4">viúvo</option>

                                    </select>
                                </div>

                                <div class="w-full">
                                    <label class="label">
                                        <span class="label-text">Profissão</span>
                                    </label>
                                    <input class="input input-bordered w-full  rounded-xl" type="text"
                                        v-model="form.profissao" required />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="w-full flex">
                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">Filiação</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="date" v-model="form.dataNascimento"
                                required />
                        </div>
                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">Data de Nascimento</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="date" v-model="form.dataNascimento"
                                required />
                        </div>
                    </div>

                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <!-- State select component -->
                            <StateSelect v-model="selectedState" />

                            <label class="label">
                                <span class="label-text">Naturalidade</span>
                            </label>
                            <div v-if="isBrazil">
                                <!-- Municipality select component for Brazil -->
                                <select class="select select-bordered w-full rounded-xl" v-model="selectedMunicipality"
                                    required>
                                    <option v-for="municipality in municipalities" :key="municipality.id"
                                        :value="municipality.nome">
                                        {{ municipality.nome }}
                                    </option>
                                </select>
                            </div>
                            <div v-else>
                                <!-- Municipality input component for other countries -->
                                <input class="input input-bordered w-full rounded-xl" v-model="selectedMunicipality"
                                    type="text" required />
                            </div>
                        </div>

                        <div class="w-48 mr-4">
                            <label class="label">
                                <span class="label-text">Estado</span>
                            </label>
                            <div v-if="isBrazil">
                                <!-- State select component for Brazil -->
                                <select class="select select-bordered w-full rounded-xl" v-model="selectedState" required>
                                    <option v-for="state in states" :key="state.id" :value="state.sigla">{{ state.sigla }}
                                    </option>
                                </select>
                            </div>
                            <div v-else>
                                <!-- State input component for other countries -->
                                <input class="input input-bordered w-full rounded-xl" v-model="selectedState" type="text"
                                    required />
                            </div>

                        </div>

                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">Nacionalidade</span>
                            </label>
                            <select class="select select-bordered w-full rounded-xl" v-model="selectedCountry" required>
                                <option v-for="country in countries" :key="country.id" :value="country.nome">{{ country.nome
                                }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">Residencia</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.residencia"
                                required />
                        </div>

                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">Local onde Trabalha</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.localtrabalho"
                                required />
                        </div>
                    </div>
                </div>

                <div class="w-1/2 ml-4">

                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">Carteira Profissional</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text"
                                v-model="form.carteiraprofissional" required />
                        </div>

                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">Série</span>
                            </label>
                            <select class="select select-bordered w-full  rounded-xl" type="select" v-model="form.serie"
                                required>
                                <option value="opcion1">Opción 1</option>
                                <option value="opcion2">Opción 2</option>
                                <option value="opcion3">Opción 3</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">Sabe ler</span>
                            </label>
                            <select class="select select-bordered w-full  rounded-xl" type="text" v-model="form.sabeler"
                                required>
                                <option value="opcion1">Sim</option>
                                <option value="opcion2">Não</option>
                            </select>
                        </div>

                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">É Eleitor</span>
                            </label>
                            <select class="select select-bordered w-full  rounded-xl" type="text" v-model="form.eleitor"
                                required>
                                <option value="opcion1">Sim</option>
                                <option value="opcion2">Não</option>
                            </select>
                        </div>
                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">Carteira Sindical</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text"
                                v-model="form.carteirasindical" required />
                        </div>
                    </div>

                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label" for="cpf">CPF</label>
                            <input class="input input-bordered w-full  rounded-xl" v-model="form.cpf" @input="formatarCPF"
                                id="cpf" name="cpf" maxlength="14">
                            <span style="color: red;">{{ cpfError }}</span>
                        </div>

                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">RG</span>
                            </label>
                            <input maxlength="12" @input="formatarRG" class="input input-bordered w-full  rounded-xl"
                                type="text" v-model="form.rg" required />
                        </div>
                    </div>

                    <h1 class="text-2xl mt-8 mb-8">Dependentes:</h1>

                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label" for="minorChildren">Filhos menores de 18 anos</label>
                            <input class="input input-bordered w-full rounded-xl" type="number" v-model="form.minorChildren"
                                id="minorChildren" name="minorChildren">
                        </div>

                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">Sexo Masculino</span>
                            </label>
                            <input class="input input-bordered w-full rounded-xl" type="number" v-model="form.maleChildren"
                                required />
                        </div>

                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">Sexo Feminino</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="number"
                                v-model="form.femaleChildren" required />
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label" for="minorChildren">Outros dependentes</label>
                            <input class="input input-bordered w-full rounded-xl" type="number" v-model="form.minorChildren"
                                id="minorChildren" name="minorChildren">
                        </div>

                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">Celular</span>
                            </label>
                            <input class="input input-bordered w-full rounded-xl" type="text" v-model="form.number"
                                @input="validatePhone" required />
                            <span v-if="phoneError" class="text-xs text-red-500">{{ phoneError }}</span>
                        </div>
                    </div>

                </div>
            </div>

            <Butoon type="submit" @click="validarCampo" class="btn btn-primary mt-8">Salvar</Butoon>
        </form>

    </div>
</template>
  
<script>
import axios from 'axios';
import Button from '../components/Button.vue';
import { ref } from 'vue';

export default {
    data() {
        return {
            municipalities: [],
            selectedMunicipality: 'Brumado',
            states: [],
            selectedState: 'BA',
            countries: [],
            selectedCountry: 'Brasil',
            selectedImage: null,
            isCameraActive: false,
            form: {
                imagem: '',
                nome: '',
                estadoCivil: '',
                profissao: '',
                naturalidade: '',
                nacionalidade: '',
                dataNascimento: '',
                residencia: '',
                localTrabalho: '',
                carteiraProfissional: '',
                serie: '',
                sabeLer: '',
                eleitor: '',
                carteiraSindical: '',
                cpf: '',
                rg: '',
                minorChildren: '',
                maleChildren: '',
                femaleChildren: '',
            },
        };
    },
    mounted() {
        this.fetchCountries();
        this.fetchStates();
        this.fetchMunicipalities();
    },
    computed: {
        isBrazil() {
            // Check if the selected country is Brazil
            return this.selectedCountry === 'Brasil';
        },
    },
    setup() {
        const camera = ref(null);

        const takeSnapshot = async () => {
            const blob = await camera.value?.snapshot();

            if (blob) {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    this.form.imagem = reader.result;
                };
            }
        };

        const submitForm = () => {
            console.log('Formulário enviado:', this.form);
        };

        return {
            camera,
            takeSnapshot,
            submitForm,
        };
    },
    watch: {
        selectedState: 'fetchMunicipalities',
        selectedCountry: 'resetStateAndMunicipality',
    },
    methods: {
        
        formatarRG() {
            // Remover caracteres não numéricos
            this.form.rg = this.form.rg.replace(/\D/g, '');

            // Adicionar pontos e traço conforme o formato do RG
            if (this.form.rg.length > 1 && this.form.rg.length <= 8) {
                this.form.rg = this.form.rg.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
            } else if (this.form.rg.length > 8) {
                this.form.rg = this.form.rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
            }

            this.validarRG();
        },
        formatarCPF() {
            // Remover caracteres não numéricos
            this.form.cpf = this.form.cpf.replace(/\D/g, '');

            if (this.form.cpf.length > 3 && this.form.cpf.length <= 6) {
                this.form.cpf = this.form.cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
            } else if (this.form.cpf.length > 6 && this.form.cpf.length <= 9) {
                this.form.cpf = this.form.cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
            } else if (this.form.cpf.length > 9) {
                this.form.cpf = this.form.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
            }

            this.validarCPF();
        },
        validarCPF() {
            let cpf = this.form.cpf.replace(/\D/g, ''); // Remover não dígitos

            if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
                this.cpfError = 'CPF inválido';
                return;
            }

            // Validar CPF usando o algoritmo
            let sum = 0;
            for (let i = 0; i < 9; i++) {
                sum += parseInt(cpf.charAt(i)) * (10 - i);
            }

            let remainder = 11 - (sum % 11);
            if (remainder === 10 || remainder === 11) {
                remainder = 0;
            }

            if (remainder !== parseInt(cpf.charAt(9))) {
                this.cpfError = 'CPF inválido';
                return;
            }

            sum = 0;
            for (let i = 0; i < 10; i++) {
                sum += parseInt(cpf.charAt(i)) * (11 - i);
            }

            remainder = 11 - (sum % 11);
            if (remainder === 10 || remainder === 11) {
                remainder = 0;
            }

            if (remainder !== parseInt(cpf.charAt(10))) {
                this.cpfError = 'CPF inválido';
                return;
            }

            this.cpfError = ''; // Se chegou aqui, o CPF é válido
        },
        async fetchCountries() {
            try {
                const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/paises');
                this.countries = response.data.map(country => ({
                    id: country.id,
                    nome: country.nome,
                }));
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        },
        async fetchStates() {
            try {
                const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
                this.states = response.data.map(state => ({
                    id: state.id,
                    nome: state.nome,
                    sigla: state.sigla,
                }));
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        },
        async fetchMunicipalities() {
            try {
                const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.selectedState}/municipios`);
                this.municipalities = response.data.map(municipality => ({
                    id: municipality.id,
                    nome: municipality.nome,
                }));
            } catch (error) {
                console.error('Error fetching municipalities:', error);
            }
        },
        resetStateAndMunicipality() {
            // Reset state and municipality when the selected country changes
            this.selectedState = '';
            this.selectedMunicipality = null;
        },
        onCountryChange() {
            // Fetch states and municipalities based on the selected country
            if (this.isBrazil) {
                this.fetchStates();
                this.fetchMunicipalities();
            }
        },
        addDragOverClass() {
            this.$refs.dropArea.classList.add('drag-over');
        },
        removeDragOverClass() {
            this.$refs.dropArea.classList.remove('drag-over');
        },
        clearSelection() {
            this.selectedImage = null;
        },
        handleDrop(event) {
            this.removeDragOverClass();

            const files = event.dataTransfer.files;
            if (files.length > 0) {
                this.handleImage(files[0]);
            }
        },
        openFileInput() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    this.handleImage(file);
                }
            };
            input.click();
        },
        openCamera() {
            this.isCameraActive = true;
            // Adicione a lógica específica da câmera aqui, por exemplo, iniciar a câmera.
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    this.$refs.cameraFeed.srcObject = stream;
                })
                .catch((error) => {
                    console.error('Erro ao acessar a câmera:', error);
                    this.isCameraActive = false;
                });
        },
        captureFromCamera() {
            // Adicione a lógica para capturar uma imagem da câmera aqui.
            const canvas = document.createElement('canvas');
            canvas.width = this.$refs.cameraFeed.videoWidth;
            canvas.height = this.$refs.cameraFeed.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(this.$refs.cameraFeed, 0, 0, canvas.width, canvas.height);

            // Converta o quadro capturado para uma imagem base64 (data URL)
            const imageData = canvas.toDataURL('image/png');
            console.log('Imagem da câmera capturada:', imageData);

            // Aqui, você pode definir this.selectedImage ou realizar qualquer ação desejada com a imagem capturada.

            // Desligue a câmera após a captura
            this.isCameraActive = false;
        },
        handleImage(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.selectedImage = reader.result;
            };
        },
        validarCampo() {
            this.form.nome = this.form.nome.replace(/[^a-zA-ZÀ-ÿ ]/g, '');
            this.form.filiacao = this.form.filiacao.replace(/[^a-zA-ZÀ-ÿ ]/g, '');
            this.form.cpf = this.form.cpf.replace(/\D/g, '');
        },
    },
};
</script>

  