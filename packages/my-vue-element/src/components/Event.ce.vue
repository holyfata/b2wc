<script setup lang="ts">
import { ref } from 'vue';
import { randomNum } from '../utils';

const num = ref(randomNum())
const list = ref<string[]>([])

const inputValue = ref('')
</script>

<template>
    <h4>事件处理</h4>
    <p>监听事件：{{ num }} <button @click="num = randomNum();">🎲</button></p>
    <p>
      事件修饰符：
      {{ list }}
      <button @click="list.push('父')">
        父按钮
        <button @click.stop="list.push('子')">子按钮</button>
      </button>
    </p>
    <p>
      按键修饰符：
      <input v-model="inputValue" @keyup.enter="inputValue = inputValue + 'enter'" />
    </p>
</template>
