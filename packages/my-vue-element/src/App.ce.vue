<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
// import TemplateCe from './components/Template.ce.vue';
// import ReactiveCe from './components/Reactive.ce.vue';
// import ComputedCe from './components/Computed.ce.vue';
// import ClassBindCe from './components/ClassBind.ce.vue';
// import ConditionCe from './components/Condition.ce.vue';
// import CircleCe from './components/Circle.ce.vue';
// import EventCe from './components/Event.ce.vue';
// import FormCe from './components/Form.ce.vue';
import WatchCe from './components/Watch.ce.vue';
import ReferenceCe from './components/Reference.ce.vue';
import ComponentCe from './components/Component.ce.vue';
import { randomNum } from './utils';
</script>

<template>
  <div>
    my-vue-element

    <!-- <TemplateCe />

    <ReactiveCe />

    <ComputedCe />

    <ClassBindCe />

    <ConditionCe />

    <CircleCe />

    <EventCe />

    <FormCe /> -->

    <WatchCe />

    <ReferenceCe />

    <ComponentCe />
  </div>
</template>


