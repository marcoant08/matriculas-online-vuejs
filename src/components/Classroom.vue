<script setup>
import GraduationCap from '@/components/icons/GraduationCap.vue'
import CaretDown from '@/components/icons/CaretDown.vue'
import XCircle from '@/components/icons/XCircle.vue'
</script>


<template>
    <div class="bg-white my-2 p-5 rounded-md shadow-md lg:max-w-[680px]">
        <GraduationCap />

        <div class="flex items-center justify-between gap-2 pb-2">
            <div class="flex flex-col gap-2 mt-2">
                <p class="text-neutral-500/80">Nome: <span class="pl-1 font-semibold text-black">{{ classroom.name }}</span>
                </p>
                <p class="text-neutral-500/80">Professor: <span class="pl-1 font-semibold text-black">{{ classroom.teacher
                }}</span></p>
            </div>
            <button @click="fetchEnrollments(classroom.id)" class="hover:bg-slate-100 rounded-[100%] p-2 transition">
                <CaretDown :class="{ 'rotate-180': showEnrollments }" />
            </button>
        </div>

        <div class="flex flex-col border-t border-neutral-200 pt-2 fade-slide-down" v-if="showEnrollments">
            <p class="font-semibold text-center py-5">{{
                enrollments?.length ? "Alunos matriculados:" : "Nenhum aluno matriculado"
            }}</p>
            <div class="flex flex-col">
                <div class="flex justify-between h-12 items-center px-2" :class="{ 'bg-neutral-100': i % 2 === 0 }"
                    v-for="(enrollment, i) in enrollments" :key="enrollment.id">
                    <p>{{ enrollment.name }} <span class="text-neutral-400">({{
                        enrollment.email }})</span> <span class="max-lg:hidden text-neutral-400">- RA: {{
        enrollment.academicRecord }}</span></p>
                    <button @click="deleteEnrollment(enrollment.enrollmentId)">
                        <XCircle />
                    </button>
                </div>
            </div>
        </div>
    </div>

    <Modal title="Feito" :close="() => setSuccessMessage()" :show="successMessage !== ''">
        <div class="flex gap-1 items-center self-center py-8">
            <div>
                <Success />
            </div>

            <p class="text-center text-lg">{{ successMessage }}</p>
        </div>
    </Modal>
</template>
  
<script>
import { defineComponent, } from 'vue';
import { api } from '@/services/api';
import Modal from './Modal.vue';
import Success from './icons/Success.vue';

export default defineComponent({
    props: {
        classroom: Object,
    },
    methods: {
        async fetchEnrollments(classroomId) {
            this.toggleShowEnrollments()

            await api.get(`classroom/${classroomId}/enrollments`)
                .then(async ({ data }) => {
                    const studentsPromises = data.enrollments.map(e => api.get(`/student/${e.studentId}`))
                    const students = (await Promise.all(studentsPromises)).map(({ data }) => data.student)
                    this.enrollments = students.map(s => ({
                        ...s,
                        enrollmentId: data.enrollments.find(e => e.studentId === s.id).id
                    }))
                })
        },
        async deleteEnrollment(enrollmentId) {
            await api.delete(`enrollment/${enrollmentId}`)
                .then(() => {
                    this.enrollments = this.enrollments.filter((enrollment => enrollment.enrollmentId !== enrollmentId))
                    this.setSuccessMessage("Matrícula deletada com sucesso!")
                })
        },
        setSuccessMessage(message) {
            this.toggleShowEnrollments(); // fecha outros modais
            this.successMessage = message || ""

            // limpa mensagem após 3 segundos
            setTimeout(() => {
                this.successMessage = ""
            }, 3000)
        },
        toggleShowEnrollments() {
            this.showEnrollments = !this.showEnrollments;
        }
    },
    async created() {
        this.enrollments = await api.get("classroom").then(({ data }) => data.enrollments)
    },
    data() {
        return {
            enrollments: [],
            showEnrollments: false,
            successMessage: ""
        };
    },
})
</script>