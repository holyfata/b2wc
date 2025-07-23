<script setup lang="ts">
import { ref } from 'vue';

const classColor = ref(true)
const styleColor = 'orange'
</script>

<template>
    <h4>样式绑定</h4>
    <p>
      绑定 HTML class：
      <span :class="{ 'color-bule': classColor, 'color-red': !classColor }">蓝色文案</span>
      <button @click="classColor = !classColor">红色/蓝色</button>
    </p>
    <p>绑定内联样式：<span :style="{ color: styleColor }">橙色文案</span></p>
</template>

<style lang="scss" scoped>
.color-bule {
  color: blue;
}
.color-red {
  color: red;
}
</style>
