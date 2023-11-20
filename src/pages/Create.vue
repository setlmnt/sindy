<template>
    <div class="w-full ">
        <h1 class="ml-40 mt-12 mb-12 text-5xl">Cadastrar novo associado</h1>
        <form class="w-3/4  mx-auto  border-2 border-secondary rounded-2xl p-8" @submit.prevent="submitForm">
            <div class="w-full flex">
                <div class="w-1/2 mr-4">
                    <div>
                        <!-- Input para escolher entre abrir a câmera ou escolher do computador -->
                        <input type="file" @change="handleFileInput" accept="image/*">

                        <!-- Botão para abrir a câmera -->
                        <button @click="openCamera">Abrir Câmera</button>

                        <!-- Modal para mostrar a câmera -->
                        <modal v-if="showCameraModal" @close="closeCameraModal">
                            <div>
                                <camera :resolution="{ width: 375, height: 600 }" ref="camera" autoplay></camera>
                                <button @click="takeSnapshot">Capturar Foto</button>
                                <div v-if="snapshotUrl">
                                    <img :src="snapshotUrl" alt="Snapshot">
                                </div>
                            </div>
                        </modal>

                        <!-- Modal para mostrar a imagem do computador -->
                        <modal v-if="showImageModal" @close="closeImageModal">
                            <div>
                                <input type="file" @change="handleFileInput" accept="image/*">
                                <div v-if="selectedImageUrl">
                                    <img :src="selectedImageUrl" alt="Selected Image">
                                </div>
                            </div>
                        </modal>
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

                        <div class="w-full">
                            <label class="label">
                                <span class="label-text">É Eleitor</span>
                            </label>
                            <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.eleitor"
                                required />
                        </div>
                    </div>

                    <div>
                        <label class="label">
                            <span class="label-text">Carteira Sindical</span>
                        </label>
                        <input class="input input-bordered w-full  rounded-xl" type="text" v-model="form.eleitor"
                            required />
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
import { ref } from 'vue';
import Camera from 'simple-vue-camera';

export default {
    data() {
        return {
            snapshotUrl: null,
            showCameraModal: false,
            showImageModal: false,
            selectedImageUrl: null,
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

            // Se a foto foi capturada, converta para base64 e atribua a `imagem` no formulário
            if (blob) {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    this.form.imagem = reader.result;
                };
            }
        };

        const submitForm = () => {
            // Implemente a lógica para enviar o formulário aqui
            console.log('Formulário enviado:', this.form);
        };

        return {
            camera,
            takeSnapshot,
            submitForm,
        };
    },
    methods: {
    openCamera() {
      this.showCameraModal = true;
    },
    closeCameraModal() {
      this.showCameraModal = false;
    },
    openImageModal() {
      this.showImageModal = true;
    },
    closeImageModal() {
      this.showImageModal = false;
    },
    takeSnapshot() {
      // Lógica para capturar uma foto da câmera
    },
    handleFileInput(event) {
      // Lógica para lidar com a seleção de um arquivo do computador
      const file = event.target.files[0];
      if (file) {
        this.selectedImageUrl = URL.createObjectURL(file);
        this.openImageModal();
      }
    },
  },
};
</script>

  