<script setup lang="ts">
import { provide } from 'vue';
import ChildrenCe from '../Children.ce.vue';

provide('name', '张三')
</script>

<template>
    <h4>依赖注入</h4>
    <p>注入name：<ChildrenCe /></p>
</template>
