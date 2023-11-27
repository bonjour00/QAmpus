<template>
  <q-btn
    dense
    round
    flat
    icon="edit"
    class="q-mx-md"
    @click="editPop(selectRow.props.row)"
  ></q-btn>
</template>
<script setup lang="ts">
const emit = defineEmits(['setSelectRow', 'dialogOpen']);
const props = defineProps<{
  selectRow: any;
}>();
const editPop = (data: any) => {
  emit('dialogOpen', true);
  emit('setSelectRow', data);
};
</script>
