<script setup lang="ts">
import { ref } from 'vue';
import { randomNum } from '../utils';

const ifNum = ref(randomNum())
const isShow = ref(true)
</script>

<template>
    <h4>条件渲染</h4>
    <p>
      vIf：
      <span v-if="ifNum < 3">0 <= ifNum < 3</span>
      <span v-else-if="ifNum < 7">3 <= ifNum < 7</span>
      <span v-else>7 <= ifNum <= 10</span>
      <button @click="ifNum = randomNum();">🎲</button>
    </p>
    <p>
      vShow：
      <span v-show="isShow">一段文案</span>
      <button @click="isShow = !isShow">show/hide</button>
    </p>
</template>
