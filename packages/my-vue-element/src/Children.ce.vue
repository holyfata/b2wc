<script setup lang="ts">
import { inject } from 'vue';

const name = inject('name')
</script>

<template>
    <div>hello, {{ name }}</div>
</template>
