<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0)
const obj = ref({ count: 0 })
</script>

<template>
    <h4>响应式基础</h4>
    <p>ref：{{ count }} <button @click="count++">count++</button></p>
    <p>深层响应：{{ obj }} <button @click="obj.count++">obj.count++</button></p>
</template>
