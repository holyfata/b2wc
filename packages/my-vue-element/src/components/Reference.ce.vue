<script setup lang="ts">
import { ref } from 'vue';

const spanRef = ref<HTMLSpanElement>()
const liRefs = ref<HTMLLIElement[]>()
</script>

<template>
  <div>
    <h4>模版引用</h4>
    <p>访问模版引用：<span ref="spanRef">AA_{{ spanRef?.textContent }}_AA</span></p>
    <p>
      v-for中的模版引用：{{ liRefs?.length }}
      <ul>
        <li v-for="(item, index) in [1, 2, 3]" ref="liRefs">{{ item }} - {{ index }}</li>
      </ul>
    </p>
  </div>
</template>
