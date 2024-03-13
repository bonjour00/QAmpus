<template>
  <q-btn
    dense
    round
    flat
    class="q-mx-md"
    @click="deleteSubmit"
    :icon="icon"
  ></q-btn>
</template>
<script setup lang="ts">
const props = defineProps<{
  selectRow: any;
  icon: string;
}>();
const emit = defineEmits(['updated']);
const deleteSubmit = () => {
  emit('updated', props.selectRow.props.row);
};
</script>
