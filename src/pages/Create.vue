<template>
    <div class="w-full ">
        <h1 class="ml-40 mt-12 mb-12 text-5xl">Cadastrar novo associado</h1>
        <form class="w-3/4  mx-auto  border-2 border-secondary rounded-2xl p-8" @submit.prevent="submitForm">
            <div class="w-full flex">
                <div class="w-1/2 mr-4">
                    <div ref="dropArea"
                        class="border-2 border-dashed border-accent p-8 w-64 text-center cursor-pointer relative"
                        @dragover.prevent @dragenter="addDragOverClass" @dragleave="removeDragOverClass" @drop="handleDrop">
                        <span class="block mb-4">Arraste e solte ou clique para escolher uma imagem</span>
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

                    <div>
                        <label class="label">
                            <span class="label-text">Nome</span>
                        </label>
                        <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.nome" required />
                    </div>
                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">Estado Civil</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.estadoCivil"
                                required />
                        </div>

                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">Profissão</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.profissao"
                                required />
                        </div>
                    </div>

                    <div>
                        <label class="label">
                            <span class="label-text">Filiação</span>
                        </label>
                        <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.filiacao"
                            required />
                    </div>

                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">Naturalidade</span>
                            </label>
                            <input class="input input-bordered w-full rounded-xl mr-2" type="text"
                                v-model="form.naturalidade" required />
                        </div>

                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">Nacionalidade</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.nacionalidade"
                                required />
                        </div>
                    </div>
                </div>

                <div class="w-1/2 ml-4">

                    <div>
                        <label class="label">
                            <span class="label-text">Data de Nascimento</span>
                        </label>
                        <input class="input input-bordered w-full  rounded-xl" type="date" v-model="form.dataNascimento"
                            required />
                    </div>

                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">Residencia</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.estadoCivil"
                                required />
                        </div>

                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">Local onde Trabalha</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.profissao"
                                required />
                        </div>
                    </div>

                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">Carteira Profissional</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.estadoCivil"
                                required />
                        </div>

                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">Série</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.profissao"
                                required />
                        </div>
                    </div>

                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">Sabe ler</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.sabeler"
                                required />
                        </div>

                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">É Eleitor</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.eleitor"
                                required />
                        </div>
                        <div class="w-full">
                        <label class="label">
                            <span class="label-text">Carteira Sindical</span>
                        </label>
                        <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.eleitor"
                            required />
                    </div>
                    </div>

                    <div class="flex w-full">
                        <div class="w-full mr-4">
                            <label class="label">
                                <span class="label-text">CPF</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.sabeler"
                                required />
                        </div>

                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">RG</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.eleitor"
                                required />
                        </div>
                    </div>
                </div>
            </div>

            <Butoon type="submit" class="btn btn-primary mt-8">Salvar</Butoon>
        </form>

    </div>
</template>
  
<script>
import Button from '../components/Button.vue';
import { ref } from 'vue';

export default {
    data() {
        return {
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
            },
        };
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
    methods: {
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
    },
};
</script>

  