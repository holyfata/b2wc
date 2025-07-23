<script setup lang="ts">
import { ref } from 'vue';

const msg = ref("京东商城")
const rawHtml = `<span style="color: #FF0F23;">京东商城</span>`
</script>

<template>
    <h4>模版语法</h4>
    <p>文本插值：{{ msg }}</p>
    <p>原始HTML：<span v-html="rawHtml"></span></p>
    <p>属性绑定：<span :style="{ color: 'blue' }">蓝色文案</span></p>
</template>
