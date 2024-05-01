<template>
  <QButton :props="customProps" @clicked="clicked" />
</template>

<script setup lang="ts">
import QButton from '../Origin/QButton.vue';
const { btnName, props } = defineProps<{
  props?: any;
  btnName: string;
}>();
const customProps = {
  ...props,
  label: btnName,
};
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
</script>
