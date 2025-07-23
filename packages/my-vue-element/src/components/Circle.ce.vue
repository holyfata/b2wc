<template>
    <h4>列表渲染</h4>
    <p v-for="(item, index) in [1, 2, 3]">
      <span>{{ item }}-A-{{ index }}</span>
    </p>
</template>
