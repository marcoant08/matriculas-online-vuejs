<script setup>
import { api } from '@/services/api';
import Layout from '../components/Layout.vue'
import XCircle from '@/components/icons/XCircle.vue';
import Success from '@/components/icons/Success.vue';
</script>

<template>
    <Layout>
        <p class="text-center text-3xl mb-5 font-semibold text-tertiary-500">Cadastrar aluno</p>

        <div class="flex flex-col gap-2 border bg-white p-5 rounded-md shadow-md w-96">
            <div class="flex gap-2 justify-between items-center">
                <label for="name">Nome:</label>
                <input class="border border-neutral-300 rounded-lg outline-none h-10 px-3 py-2 disabled:bg-neutral-200"
                    id="name" :value="name" @input="event => name = event.target.value">
            </div>

            <div class="flex gap-2 justify-between items-center">
                <label for="email">E-mail:</label>
                <input class="border border-neutral-300 rounded-lg outline-none h-10 px-3 py-2 disabled:bg-neutral-200"
                    id="email" :value="email" @input="event => email = event.target.value">
            </div>

            <div class="flex gap-2 justify-between items-center">
                <label for="academicRecord">RA:</label>
                <input class="border border-neutral-300 rounded-lg outline-none h-10 px-3 py-2 disabled:bg-neutral-200"
                    id="academicRecord" :value="academicRecord" @input="event => academicRecord = event.target.value">
            </div>

            <div class="flex gap-2 justify-between items-center">
                <label for="documentNumber">CPF:</label>
                <input class="border border-neutral-300 rounded-lg outline-none h-10 px-3 py-2 disabled:bg-neutral-200"
                    id="documentNumber" :value="documentNumber" @input="event => documentNumber = event.target.value">
            </div>

            <div class="flex gap-3 justify-between pt-3">
                <button @click="clear"
                    class="bg-tertiary-500 text-white px-3 py-2 rounded-md w-full hover:bg-tertiary-400 transition">Limpar</button>
                <button @click="createStudent"
                    class="bg-tertiary-500 text-white px-3 py-2 rounded-md w-full hover:bg-tertiary-400 transition">Concluir</button>
            </div>

            <div class="flex gap-1 items-center self-center" v-if="failureMessage">
                <div>
                    <XCircle />
                </div>
                <p class="text-center">Falha: {{ failureMessage }}</p>
            </div>

            <div class="flex gap-1 items-center self-center" v-if="successMessage">
                <div>
                    <Success />
                </div>
                <p class="text-center">{{ successMessage }}</p>
            </div>
        </div>
    </Layout>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            academicRecord: '',
            documentNumber: '',
            failureMessage: '',
            successMessage: '',
        };
    },
    methods: {
        async createStudent() {
            await api.post("student", {
                name: this.name,
                email: this.email,
                academicRecord: this.academicRecord,
                documentNumber: this.documentNumber
            })
                .then(() => {
                    this.clear()
                    this.successMessage = "Sucesso!"
                    this.failureMessage = ""
                })
                .catch(e => {
                    this.failureMessage = e.response.data.message
                    this.successMessage = ""
                })
        },
        clear() {
            this.name = ''
            this.email = ''
            this.academicRecord = ''
            this.documentNumber = ''
        }
    }
};
</script>