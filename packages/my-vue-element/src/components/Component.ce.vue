<script setup lang="ts">
import { ref } from 'vue';
import ButtonCe from '../Button.ce.vue';

import Button1Ce from '../Button1.ce.vue';
import Button2Ce from '../Button2.ce.vue';

const count = ref(0)

const currentButton = ref(0)
const buttons = [Button1Ce, Button2Ce]
</script>

<template>
  <div>
    <h4>组件基础</h4>
    <p>传递props：<ButtonCe text="一个按钮"></ButtonCe></p>
    <p>监听事件：count: {{ count }} <ButtonCe text="一个按钮" @increase="count++"></ButtonCe></p>
    <p>插槽：<ButtonCe text="第二个按钮">---后缀</ButtonCe></p>
    <p>
      动态组件：
      <component :is="buttons[currentButton]"></component> 
      <button @click="currentButton = 0">1</button>
      <button @click="currentButton = 1">2</button>
    </p>
  </div>
</template>
