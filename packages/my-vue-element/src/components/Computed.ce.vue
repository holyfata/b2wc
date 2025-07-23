<script setup lang="ts">
import { computed, ref } from 'vue'
import { randomNum } from '../utils'

const num1 = ref(randomNum())
const num2 = ref(randomNum())
const multi = computed(() => {
  return num1.value * num2.value
})

const writableMulti = computed({
  get () {
    return num1.value * num2.value
  },
  set (value) {
    num1.value = 1
    num2.value = value
  }
})
</script>

<template>
    <h4>计算属性</h4>
    <p>
      基础示例：{{ num1 }} * {{ num2 }} = {{ multi }} 
      <button @click="num1 = randomNum();num2 = randomNum()">🎲</button>
    </p>
    <p>
      可写计算属性：{{ writableMulti }}
      <button @click="writableMulti = randomNum(100);">🎲</button>
    </p>
</template>
