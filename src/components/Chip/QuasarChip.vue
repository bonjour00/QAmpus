<template>
  <q-chip round class="q-my-xs" :color="color" :text-color="textColor">{{
    text
  }}</q-chip>
</template>
<script setup lang="ts">
const props = defineProps<{
  color: string;
  textColor: string;
  text: string;
}>();
</script>
