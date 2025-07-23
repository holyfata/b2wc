<script setup lang="ts">
import TestCe from '../Test.ce.vue'
import { ref } from 'vue'

const render = ref(true)

const handleRender = () => {
    render.value = false
    setTimeout(() => {
      render.value = true
    }, 1000)
}
</script>

<template>
    <h4>生命周期</h4>
    <button @click="handleRender">重绘测试组件</button>
    <TestCe v-if="render" />
</template>
