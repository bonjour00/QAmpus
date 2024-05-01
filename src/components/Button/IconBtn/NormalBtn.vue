<template>
  <q-btn
    unelevated
    color="primary"
    @click="clicked"
    style="min-width: 115px"
    class="radius-8 text-weight-bold"
  >
    <q-icon :name="icon" />{{ btnName }}
  </q-btn>
</template>
<script setup lang="ts">
const props = defineProps<{
  btnName: string;
  icon: string;
}>();
const emit = defineEmits(['clicked']);
const clicked = () => {
  emit('clicked');
};
</script>
