<template>
    <div>
        <label :for="id">{{ label }}</label>
        <input :type="type" :id="id" v-model="valor" />
    </div>
</template>
  
<script>
export default {
    props: {
        id: String,
        label: String,
        type: {
            type: String,
            default: 'text'
        },
        valor: String
    }
};
</script>