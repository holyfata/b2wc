<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { randomNum } from '../utils';

const count = ref(randomNum())
const baseString = ref('')
watch(count, (newValue, oldValue) => {
  baseString.value = `count changed from ${oldValue} to ${newValue}`
})

const obj = reactive({ count: 0 })
const deepString = ref('')
const immediateString = ref('')
watch(
  () => obj, 
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // 除非 obj 被整个替换了
    deepString.value = `obj changed from ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`
  }, 
  { deep: true }
)
watch(obj, () => {
  immediateString.value = 'watch immediate'
}, { immediate: true })
</script>

<template>
  <div>
    <h4>侦听器</h4>
    <p>源数据：{{ count }} <button @click="count++; obj.count = count;">+1</button></p>
    <p>基本示例：{{ baseString }}</p>
    <p>深层侦听器：{{ deepString }}</p>
    <p>即时回调的侦听器：{{ immediateString }}</p>
  </div>
</template>
