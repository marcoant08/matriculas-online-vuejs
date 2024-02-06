<script setup>
import Layout from '@/components/Layout.vue'
</script>

<template>
    <Layout>
        <p class="text-3xl text-center pb-5 font-semibold text-tertiary-500">Alunos cadastrados</p>

        <div class="flex flex-col w-full bg-white rounded-md shadow-md lg:max-w-[680px] fade-slide-down">
            <div class="flex justify-between h-12 items-center px-2" :class="{ 'bg-neutral-100': i % 2 !== 0 }"
                v-for="(student, i) in students" :key="student.id">
                <Student :student="student" :setAction="setAction" :deleteStudent="deleteStudent"
                    :setSelectedStudent="setSelectedStudent" />
            </div>
        </div>

        <Modal title="Matricular numa turma" :close="closeModal" :show="action === 'enrollment'">
            <div>
                <div v-for="(classroom, i) in classrooms" :key="classroom.id" :class="{ 'bg-neutral-100': i % 2 !== 0 }">
                    <div class="flex items-center justify-between gap-2 pb-2">
                        <div class="flex gap-2 my-4 items-center mx-3 justify-between w-full">
                            <p class="text-neutral-500">{{ classroom.name }}</p>
                            <button @click="enroll(classroom.id)">
                                <SuccessRegular />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="flex gap-1 self-center my-4 justify-center items-center" v-if="failureMessage">
                    <div>
                        <XCircle />
                    </div>
                    <p class="text-center text-lg">Falha: {{ failureMessage }}</p>
                </div>
            </div>
        </Modal>

        <Modal title="Editar cadastro" :close="closeModal" :show="action === 'edit'">
            <div class="flex flex-col gap-2 bg-white p-5 mx-auto w-96">
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

                <div class="flex gap-3 justify-between pt-3">
                    <button @click="() => setAction()"
                        class="border border-tertiary-500 px-3 py-2 rounded-md w-full hover:bg-neutral-100 transition text-tertiary-500">Cancelar</button>
                    <button @click="updateStudent"
                        class="bg-tertiary-500 text-white px-3 py-2 rounded-md w-full hover:bg-tertiary-400 transition">Concluir</button>
                </div>

                <div class="flex gap-1 items-center self-center" v-if="failureMessage">
                    <div>
                        <XCircle />
                    </div>
                    <p class="text-center">Falha: {{ failureMessage }}</p>
                </div>
            </div>
        </Modal>

        <Modal title="Deseja excluir o aluno?" :close="closeModal" :show="action === 'delete'">
            <div class="flex flex-col gap-2 bg-white p-5 mx-auto rounded-md shadow-md w-96">
                <div class="flex gap-3 justify-between pt-3">
                    <button @click="() => setAction()"
                        class="border border-tertiary-500 px-3 py-2 rounded-md w-full hover:bg-neutral-100 transition text-tertiary-500">Cancelar</button>
                    <button @click="deleteStudent"
                        class="bg-negative-500 text-white px-3 py-2 rounded-md w-full hover:bg-negative-400 transition">Confirmar</button>
                </div>

                <div class="flex gap-1 items-center self-center" v-if="failureMessage">
                    <div>
                        <XCircle />
                    </div>
                    <p class="text-center">Falha: {{ failureMessage }}</p>
                </div>
            </div>
        </Modal>

        <Modal title="Feito" :close="() => setSuccessMessage()" :show="successMessage !== ''">
            <div class="flex gap-1 items-center self-center py-8">
                <div>
                    <Success />
                </div>

                <p class="text-center text-lg">{{ successMessage }}</p>
            </div>
        </Modal>
    </Layout>
</template>

<script>
import { defineComponent, } from 'vue';
import { api } from '@/services/api';
import Student from '@/components/Student.vue';
import XCircle from '@/components/icons/XCircle.vue';
import Modal from '@/components/Modal.vue';
import SuccessRegular from '@/components/icons/SuccessRegular.vue';
import Success from '@/components/icons/Success.vue';

export default defineComponent({
    name: "Students",
    methods: {
        async deleteStudent() {
            await api.delete(`student/${this.selectedStudent}`)
                .then(() => {
                    this.students = this.students.filter((student => student.id !== this.selectedStudent));
                    this.setSuccessMessage("Cadastro excluído com sucesso!")
                }).catch(e => {
                    this.setFailureMessage(e.response.data.message)
                })
        },

        async updateStudent() {
            if (this.selectedStudent) {
                const data = { name: this.name, email: this.email }
                await api.patch(`student/${this.selectedStudent}`, data)
                    .then(() => {
                        this.students = this.students.map((student => {
                            if (student.id === this.selectedStudent) {
                                return { ...student, name: this.name, email: this.email }
                            } else return student
                        }));
                        this.setSuccessMessage("Cadastro atualizado com sucesso!")
                    }).catch(e => {
                        this.setFailureMessage(e.response.data.message)
                    })
            }

        },

        closeModal() {
            this.setSelectedStudent()
            this.setAction()
        },

        setSelectedStudent(studentId) {
            this.failureMessage = ""
            this.selectedStudent = this.selectedStudent ? "" : studentId;


            if (this.selectedStudent) {
                const student = this.students.find(s => s.id === this.selectedStudent)
                this.name = student?.name
                this.email = student?.email
            }
        },

        setAction(action) {
            this.failureMessage = ""
            this.action = this.action ? "" : action;
        },

        setSuccessMessage(message) {
            this.closeModal(); // fecha outros modais
            this.successMessage = message || ""

            // limpa mensagem após 3 segundos
            setTimeout(() => {
                this.successMessage = ""
            }, 3000)
        },

        setFailureMessage(message) {
            this.failureMessage = message || ""

            // limpa mensagem após 3 segundos
            setTimeout(() => {
                this.failureMessage = ""
            }, 3000)
        },

        async enroll(classroomId) {
            await api.post("enrollment", { studentId: this.selectedStudent, classroomId })
                .then(() => {
                    this.setSuccessMessage("Matriculado com sucesso")
                }).catch(e => {
                    this.setFailureMessage(e.response.data.message)
                })
        }
    },
    async created() {
        this.students = await api.get("student").then(({ data }) => data.students)
        this.classrooms = await api.get("classroom").then(({ data }) => data.classrooms)
    },
    data() {
        return {
            name: "",
            email: "",
            action: "",
            students: [],
            selectedStudent: "",
            failureMessage: "",
            successMessage: "",
            classrooms: [],
        };
    },
})
</script>
