<script setup lang="ts">
import { ref } from 'vue';

const checked = ref()
const checked2 = ref('yes')
const inputValue2 = ref('')
</script>

<template>
    <h4>表单输入绑定</h4>
    <p>
      基本用法：
      <input type="checkbox" v-model="checked" />
      <label>{{ checked }}</label>
    </p>
    <p>
      值绑定：
      <input type="checkbox" v-model="checked2" true-value="yes" false-value="no" />
      <label>{{ checked2 }}</label>
    </p>
    <p>
      修饰符：
      <input v-model.lazy="inputValue2" />
      <label>{{ inputValue2 }}</label>
    </p>
</template>
