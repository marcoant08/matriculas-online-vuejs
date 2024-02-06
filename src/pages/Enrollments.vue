<script setup>
import Layout from '@/components/Layout.vue'
import Classroom from '@/components/Classroom.vue'
</script>

<template>
    <Layout>
        <div class="flex flex-col">
            <p class="text-3xl text-center pb-3 font-semibold text-tertiary-500">Turmas disponíveis</p>

            <div v-for="classroom in classrooms" :key="classroom.id">
                <Classroom :classroom="classroom" />
            </div>
        </div>
    </Layout>
</template>

<script>
import { defineComponent, } from 'vue';
import { api } from '@/services/api';

export default defineComponent({
    name: "Enrollments",
    async created() {
        this.classrooms = await api.get("classroom").then(({ data }) => data.classrooms)
    },
    data() {
        return {
            classrooms: [],
        };
    },
})
</script>
