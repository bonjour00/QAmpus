<template>
  <div class="row">
    <p>{{ toDescription }}</p>
    <RouterLink :to="to" style="text-decoration: none; color: inherit">
      <span class="text-primary text-weight-medium">{{ toLinkTitle }}</span>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  toDescription: string;
  to: string;
  toLinkTitle: string;
}>();
</script>
