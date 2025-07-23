<script setup lang="ts">
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

onBeforeMount(() => {
  console.log("@b2wc---组件即将挂载")
})

onMounted(() => {
  console.log("@b2wc---组件已挂载")
})

onBeforeUpdate(() => {
  console.log("@b2wc---页面即将更新")
})

onUpdated(() => {
  console.log("@b2wc---页面已更新")
})

onBeforeUnmount(() => {
  console.log("@b2wc---组件即将卸载")
})

onUnmounted(() => {
  console.log("@b2wc---组件已卸载")
})
</script>

<template>
    <div>测试组件</div>
</template>
