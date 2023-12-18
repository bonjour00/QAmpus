<template>
  <q-pagination
    :modelValue="pagination.page"
    @update:model-value="
      (value) => $emit('update:pagination', { ...pagination, page: value })
    "
    :max="pagesNumber"
    max-pages="6"
    boundary-numbers
    direction-links
    active-color="accent"
    unelevated
    color="secondary"
    text-color="black"
    active-text-color="white"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Pagination } from '../data ';

const props = defineProps<{
  pagination: Pagination;
}>();
defineEmits(['update:pagination']);

const pagesNumber = computed(() =>
  Math.ceil(props.pagination.rowLength / props.pagination.rowsPerPage)
);
</script>
