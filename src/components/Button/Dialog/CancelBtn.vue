<template>
  <QButton :props="customProps" @clicked="clicked" label="取消" />
</template>

<script setup lang="ts">
import QButton from '../Origin/QButton.vue';
const { props } = defineProps<{
  props?: any;
}>();
const customProps = {
  ...props,
  outline: true,
};
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
</script>
