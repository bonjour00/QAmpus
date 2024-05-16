<template>
  <QButton :props="customProps" @clicked="clicked" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QButton from '../Origin/QButton.vue';
const props = defineProps<{
  props?: any;
  btnName: string;
}>();

const customProps = computed(() => {
  return {
    ...props.props,
    label: props.btnName,
  };
});
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
</script>
