
<template>
    <a :href="to"
        class="bg-white shadow-lg p-4 rounded-md w-80 h-40 text-center flex flex-col gap-3 items-center justify-center hover:bg-slate-100 transition">
        <p class="font-semibold text-xl">{{ title }}</p>
        <p>{{ description }}</p>
    </a>
</template>
  
<script>
export default {
    props: {
        title: String,
        description: String,
        to: String
    },
}
</script>