<script setup lang="ts">
import { computed, ref } from 'vue';

const msg = ref("京东商城")
const rawHtml = `<span style="color: #FF0F23;">京东商城</span>`

const count = ref(0)
const obj = ref({ count: 0 })

const randomNum = (max: number = 10) => Math.ceil(Math.random() * max)

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

const classColor = ref(true)
const styleColor = 'orange'

const ifNum = ref(randomNum())
const isShow = ref(true)
</script>

<template>
  <div>
    my-vue-element

    <h4>模版语法</h4>
    <p>文本插值：{{ msg }}</p>
    <p>原始HTML：<span v-html="rawHtml"></span></p>
    <p>属性绑定：<span :style="{ color: 'blue' }">蓝色文案</span></p>

    <h4>响应式基础</h4>
    <p>ref：{{ count }} <button @click="count++">count++</button></p>
    <p>深层响应：{{ obj }} <button @click="obj.count++">obj.count++</button></p>

    <h4>计算属性</h4>
    <p>
      基础示例：{{ num1 }} * {{ num2 }} = {{ multi }} 
      <button @click="num1 = randomNum();num2 = randomNum()">🎲</button>
    </p>
    <p>
      可写计算属性：{{ writableMulti }}
      <button @click="writableMulti = randomNum(100);">🎲</button>
    </p>

    <h4>样式绑定</h4>
    <p>
      绑定 HTML class：
      <span :class="{ 'color-bule': classColor, 'color-red': !classColor }">蓝色文案</span>
      <button @click="classColor = !classColor">红色/蓝色</button>
    </p>
    <p>绑定内联样式：<span :style="{ color: styleColor }">橙色文案</span></p>

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

    <h4>列表渲染</h4>
    <p v-for="(item, index) in [1, 2, 3]">
      <span>{{ item }}-A-{{ index }}</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.color-bule {
  color: blue;
}
.color-red {
  color: red;
}
</style>
