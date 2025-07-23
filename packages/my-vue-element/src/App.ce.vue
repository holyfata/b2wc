<script setup lang="ts">
import { ref } from 'vue';
import TemplateCe from './components/Template.ce.vue';
import ReactiveCe from './components/Reactive.ce.vue';
import ComputedCe from './components/Computed.ce.vue';
import ClassBindCe from './components/ClassBind.ce.vue';
import ConditionCe from './components/Condition.ce.vue';
import CircleCe from './components/Circle.ce.vue';
import EventCe from './components/Event.ce.vue';
import FormCe from './components/Form.ce.vue';

</script>

<template>
  <div>
    my-vue-element

    <TemplateCe />

    <ReactiveCe />

    <ComputedCe />

    <ClassBindCe />

    <ConditionCe />

    <CircleCe />

    <EventCe />

    <FormCe />
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
