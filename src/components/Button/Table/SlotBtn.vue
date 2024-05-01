<template>
  <q-btn
    class="radius-8 text-weight-bold"
    :label="btnName"
    unelevated
    color="primary"
    @click="clicked"
    :disable="disable"
    ><slot></slot
  ></q-btn>
</template>
<script setup lang="ts">
const props = defineProps<{
  btnName: string;
  disable?: boolean;
}>();
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
</script>
