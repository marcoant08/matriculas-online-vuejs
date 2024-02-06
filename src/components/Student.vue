
<template>
    <div class="flex justify-between w-full h-12 items-center px-2">
        <p>{{ student?.name }} <span class="text-neutral-400">({{ student?.email }})</span> <span
                class="max-lg:hidden text-neutral-400">- RA:
                {{
                    student?.academicRecord }}</span></p>

        <div class="flex gap-2 h-10 items-center">
            <button :href="`edit/${student?.id}`" class="ml-auto" @click="() => {
                setAction('edit');
                setSelectedStudent(student?.id);
            }">
                <Edit />
            </button>

            <button class="ml-auto" @click="() => {
                setAction('enrollment');
                setSelectedStudent(student?.id);
            }">
                <GraduationCap />
            </button>

            <button class="ml-auto" @click="() => {
                setAction('delete');
                setSelectedStudent(student?.id);
            }">
                <XCircle />
            </button>
        </div>
    </div>
</template>

<script>
import Edit from './icons/Edit.vue';
import GraduationCap from './icons/GraduationCap.vue';
import XCircle from './icons/XCircle.vue';

export default {
    props: {
        student: Object,
        deleteStudent: Function,
        setSelectedStudent: Function,
        setAction: Function,
    },
    components: { XCircle, GraduationCap, Edit }
}
</script>