<template>
  <q-btn
    :flat="flat"
    :label="btnName"
    unelevated
    color="primary"
    @click="clicked"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  btnName: string;
  flat?: boolean;
}>();
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
</script>
