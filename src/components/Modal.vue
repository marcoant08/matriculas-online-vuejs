
<template>
    <div class="fixed top-0 bottom-0 right-0 left-0 z-20 bg-black/40 flex justify-center items-center fade-in" v-if="show">
        <div class="bg-white w-full mx-2 rounded-md shadow-md justify-end flex flex-col  lg:max-w-[680px]">
            <div class="flex justify-center items-center w-full border-b">
                <p class="text-center justify-between w-full font-semibold text-lg">{{ title }}</p>
                <button @click="() => close()" class="p-3">
                    <XCircle />
                </button>
            </div>

            <slot></slot>
        </div>
    </div>
</template>
  
<script>
import XCircle from './icons/XCircle.vue';

export default {
    props: {
        title: String,
        show: Boolean,
        close: Function
    },
    components: { XCircle }
}
</script>
