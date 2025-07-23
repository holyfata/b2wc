<script setup lang="ts">
defineProps<{
    text: string;
}>()
</script>

<template>
    <button @click="$emit('increase')">{{ text }} <slot></slot></button>
</template>
