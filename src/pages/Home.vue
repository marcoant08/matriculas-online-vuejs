<script setup>
import Layout from '../components/Layout.vue'
import Option from '../components/Option.vue'
</script>

<template>
    <Layout>
        <div class="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-3">
            <Option to="/add-student" title="Cadastrar alunos" description="Adicione um aluno"></Option>
            <Option to="/manage-students" title="Listar alunos" description="Veja ou remova cadastro de alunos"></Option>
            <Option to="/enrollments" title="Ver turmas online"
                description="Veja ou remova matrículas de alunos em turmas online"></Option>
        </div>
    </Layout>
</template>