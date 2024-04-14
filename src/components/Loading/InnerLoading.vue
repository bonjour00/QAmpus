<template>
  <q-inner-loading
    :showing="showing"
    :label="label"
    label-class="primary"
    label-style="font-size: 1.1em"
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  showing: any;
  label?: any;
}>();
</script>
