<script setup>
import Student from './icons/Student.vue'
</script>

<template>
    <div class="h-screen overflow-y-auto overflow-x-hidden grid grid-rows-12">
        <header class="bg-info-500 flex items-center shadow-lg row-span-1 z-10 sticky top-0">
            <div class="flex items-center justify-center gap-3 mx-auto">
                <Student />
                <p class="font-semibold text-white text-lg border-b-2 border-white">Matrículas Online</p>
            </div>
        </header>

        <div class="row-span-11 grid grid-rows-11">
            <main class="bg-neutral-100 overflow-y-auto flex flex-col py-10 items-center px-4 row-span-8">
                <slot></slot>
            </main>

            <footer class="bg-info-500 py-16 flex flex-col gap-2 px-10 lg:px-80 row-span-3">
                <div>
                    <Student />
                </div>
                <p class="text-white">Gestão de matrículas online</p>
                <p class="text-white">Todos os direitos reservados</p>
                <p class="text-white">Copyright © 2024 @marcoant08</p>
            </footer>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        classrooms: Array,
    },
}
</script>
